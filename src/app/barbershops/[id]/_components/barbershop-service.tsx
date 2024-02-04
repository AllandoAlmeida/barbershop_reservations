"use client";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import CalendarBookings from "./calendar-bookings";
import { useState } from "react";

interface BarbershopServiceProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

const BarbershopService = ({
  barbershop,
  service,
  isAuthenticated,
}: BarbershopServiceProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const handleCreateBooking = () => {
    if (!isAuthenticated) return signIn("google");
  };
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-2 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "cover" }}
              className="round"
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm">{service.description}</p>
            <div className="flex item-center justify-between mt-3 ">
              <p className="text-primary font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger>
                  <Button
                    variant={"secondary"}
                    className="text-primary"
                    onClick={handleCreateBooking}
                  >
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secundary">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>
                  <CalendarBookings service={service} barbershop={barbershop} setSheetIsOpen={setSheetIsOpen}/>
                  
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopService;
