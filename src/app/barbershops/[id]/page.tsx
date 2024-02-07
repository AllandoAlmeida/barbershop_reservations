import { db } from "@/_lib/prisma";
import BarbershopNav from "./_components/barbershop-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";
import CardService from "./_components/card-service";

interface BarbershopDetailsProps {
  params: { id?: string };
}

const BarbershopDetails = async ({ params }: BarbershopDetailsProps) => {
  const session = await getServerSession(authOptions);
  if (!params.id) {
    return null;
  }
  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <main>
      <div className="mx-auto max-w-[900px]">
        <BarbershopNav barbershop={barbershop} />
        <div className="md:grid grid-cols-2 sm:gap-4 px-5 py-6">
          {barbershop.services.map((service) => (
            <CardService
              key={service.id}
              barbershop={barbershop}
              service={service}
              isAuthenticated={!!session?.user}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BarbershopDetails;
