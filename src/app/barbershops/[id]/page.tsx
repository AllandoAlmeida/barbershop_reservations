import { db } from "@/_lib/prisma";
import BarbershopNav from "./_components/barbershop-nav";
import BarbershopService from "./_components/barbershop-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

interface BarbershopDetailsProps {
  params: { id?: string };
}

const BarbershopDetails = async ({ params }: BarbershopDetailsProps) => {
  const session = await getServerSession(authOptions)
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
    <>
      <BarbershopNav barbershop={barbershop} />
      <div className="px-5 flex flex-col gap-3 py-6">
      {barbershop.services.map((service) => (
        <BarbershopService key={service.id} barbershop={barbershop} service={service} isAuthenticated={!!session?.user} />
      ))}

      </div>
    </>
  );
};

export default BarbershopDetails;
