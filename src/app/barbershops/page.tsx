import Header from "@/_components/header";
import { db } from "@/_lib/prisma";
import BarbershopItem from "../(home)/_components/barbershop-items";
import Search from "../(home)/_components/search";

interface BarbershopsProps {
  searchParams: {
    search: string;
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
      <Header />
      <div className="px-6 py-6">
        <Search
          defaultValues={{
            search: searchParams.search,
          }}
        />
        <div className="px-4 py-6">
          <h1 className="text-gray-400 font-bold text-xs uppercase">
            Resultado para &quot;
            {searchParams?.search ? searchParams.search : "todos"}&quot;
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {barbershops.map((barbershop) => (
            <div className="w-full" key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Barbershops;
