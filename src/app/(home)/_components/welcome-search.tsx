"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./search";
import { useSession } from "next-auth/react";

const WelcomeOrSearch = () => {
  const { data } = useSession();
  return (
    <div>
      <div className="px-5 pt-5 ">
        {data?.user ? (
          <h2 className="text-xl font-bold">
            Olá, {data.user.name?.split(" ")[0]}!
          </h2>
        ) : (
          <h2 className="text-xl font-bold">Olá, Seja bem vindo!</h2>
        )}
        <p className="text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM ", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-9">
        <Search />
      </div>
    </div>
  );
};

export default WelcomeOrSearch;
