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

interface CardServiceProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

const CardService = ({
  barbershop,
  service,
  isAuthenticated,
}: CardServiceProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const handleCreateBooking = () => {
    if (!isAuthenticated) return signIn("google");
  };
  return (
    <Card className="p-3 w-full my-3 flex flex-col md:my-0 gap-3 flex-1">
      <CardContent className="p-3 w-full flex-1 ">
        <div className="flex gap-4 items-center w-full ">
          <div className="flex flex-row gap-2 sm:flex-row w-full">
            <div className="relative image-service-mobile sm:image-service-web">
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                style={{ objectFit: "cover" }}
                className="round rounded-full sm:rounded-none"
              />
            </div>
            <div className="flex flex-col w-[100%] flex-1">
              <h2 className="font-bold">{service.name}</h2>
              <p className="text-sm text-gray-400">
                {service.description}
              </p>

              <div className="flex items-center justify-between mt-3 ">
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
                    <CalendarBookings
                      service={service}
                      barbershop={barbershop}
                      setSheetIsOpen={setSheetIsOpen}
                    />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardService;
