import Header from "@/_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "@/_components/booking-item";
import { db } from "@/_lib/prisma";
import BarbershopItem from "./_components/barbershop-items";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({});

  const shuffleArray = (array: any) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const shuffledBarbershops = shuffleArray(barbershops);

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 overflow-hidden">
        <div className="md:flex flex-row">
          <div className="flex flex-col w-full sm:w-[60%]">
            <div className="px-5 pt-5">
              <h2 className="text-xl font-bold">Olá, Miguel</h2>
              <p className="capitalize text-sm">
                {format(new Date(), "EEEE',' dd 'de' MMMM ", { locale: ptBR })}
              </p>
            </div>
            <div className="px-5 mt-6">
              <Search />
            </div>

            <div className="px-5 mt-6">
              <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">
                Agendamento
              </h2>
              <BookingItem />
            </div>
          </div>
          <div className="mt-6 px-5 md:w-[50%]">
            <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">
              Recomendados
            </h2>
            <div className="flex gap-4  overflow-x-auto [::-webkit-scrollbar]:hidden">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 px-5 mb-[4.5rem]">
          <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">
            Populares
          </h2>
          <div className="flex gap-4  overflow-x-auto [::-webkit-scrollbar]:hidden">
            {shuffledBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
