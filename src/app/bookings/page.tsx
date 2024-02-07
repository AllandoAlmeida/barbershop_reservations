import Header from "@/_components/header";
import { getServerSession } from "next-auth";
import { db } from "@/_lib/prisma";
import BookingItem from "@/_components/card-bookings";
import { redirect } from "next/navigation";
import { authOptions } from "@/_lib/auth";

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBooking, finashedBooking] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),

    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <main>
      <Header />
      <div className="mx-auto max-w-[900px] py-6">
        <div>
          <h1 className="text-xl font-bold mb-6">Agendamentos</h1>
          {!confirmedBooking?.length ? (
            <div className="py-6">
              <h3 className="text-gray-600 uppercase font-bold text-sm mt-6 mb-3">
                Não há histórico de agendamentos em aberto
              </h3>
            </div>
          ) : (
            <div>
              <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
                Em Aberto
              </h2>
              <div className="py-6 sm:grid sm:grid-cols-3">
                {confirmedBooking.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}

          {!finashedBooking?.length ? (
            <div className="py-6">
              <></>
            </div>
          ) : (
            <div>
              <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
                Finalizados
              </h2>
              <div className="py-6 sm:grid sm:grid-cols-3">
                {finashedBooking.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Bookings;
