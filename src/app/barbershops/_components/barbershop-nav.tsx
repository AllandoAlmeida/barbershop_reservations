"use client";
import { Barbershop } from "@prisma/client";
import { Button } from "../../../_components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/_components/ui/sheet";
import SidMenu from "@/_components/sid-menu";

interface BarbershopDetaitsProps {
  barbershop: Barbershop;
}

const BarbershopNav = ({ barbershop }: BarbershopDetaitsProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.replace('/');
  };
  return (
    <>
      <div className="h-[15.62rem] w-full relative">
        <Button
          onClick={handleBackClick}
          size={"icon"}
          variant={"outline"}
          className="z-50 absolute top-4 left-4"
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          {/* Botão para abrir o menu */}
          <SheetTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="z-50 absolute top-4 right-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          {/* conteudo do menu */}
          <SheetContent className="p-0">
            <SidMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{ objectFit: "cover" }}
          className="opacity-75"
        />
      </div>
      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>
      </div>
    </>
  );
};

export default BarbershopNav;
