import Header from "@/_components/header";
import BookingItem from "@/_components/card-bookings";
import { db } from "@/_lib/prisma";
import BarbershopItem from "./_components/barbershop-items";
import WelcomeOrSearch from "./_components/welcome-search";
import { getServerSession } from "next-auth";
import { ListRandomBarbershops } from "../_helpers/list-random-barbershops";
import { authOptions } from "@/_lib/auth";
import { use } from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBooking] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
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
        })
      : Promise.resolve([]),
  ]);

  const shuffledBarbershops = ListRandomBarbershops(barbershops);

  return (
    <main>
      <Header />
      <div className="mx-auto max-w-[900px]">
        <div className="container mx-auto px-4">
          <div className="md:flex flex-row">
            {session?.user ? (
              <div className="flex flex-col w-full sm:w-[60%] ">
                <WelcomeOrSearch />
                <div className="px-5 mt-9">
                  <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">
                    Agendamento
                  </h2>
                  <div className="flex gap-3 mt-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {confirmedBooking.map((booking) => (
                      <BookingItem key={booking.id} booking={booking} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full sm:w-[60%] justify-center">
                <WelcomeOrSearch />
              </div>
            )}
            <div className="mt-6 px-5 md:w-[50%]">
              <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">
                Recomendados
              </h2>
              <div className="flex gap-4  overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {barbershops.map((barbershop) => (
                  <div
                    key={barbershop.id}
                    className="min-w-[10.4375rem] max-w-[10.4375rem]"
                  >
                    <BarbershopItem
                      key={barbershop.id}
                      barbershop={barbershop}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 px-5 mb-[4.5rem]">
            <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">
              Populares
            </h2>
            <div className="flex gap-4  overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {shuffledBarbershops.map((barbershop) => (
                <div
                  key={barbershop.id}
                  className="min-w-[10.4375rem] max-w-[10.4375rem]"
                >
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
