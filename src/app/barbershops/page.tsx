import CardBarbershop from "@/_components/card-barbershop";
import Header from "@/_components/header";
import { db } from "@/_lib/prisma";
import BarbershopItem from "../(home)/_components/barbershop-items";

interface BarbershopsProps {
  searchParams: {
    search?: string;
  };
}

const Barbershops = async ({ searchParams }: BarbershopsProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <main className="mx-auto max-w-[900px]">
      <div className="px-5 py-6">
        <Header />
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultado para &quot;{searchParams.search}&quot;
          <div className="grid grid-cols-2 gap-4">
            {barbershops.map((barbershop) => (
              <div className="w-full" key={barbershop.id}>
                <BarbershopItem barbershop={barbershop} />
              </div>
            ))}
          </div>
        </h1>
      </div>
    </main>
  );
};

export default Barbershops;
