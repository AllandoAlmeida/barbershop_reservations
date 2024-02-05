"use client";
import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { format, isFuture, isPast } from "date-fns";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import CardBarbershop from "./card-barbershop";
import { CardBookingDetails } from "./card-booking-details";
import { Button } from "./ui/button";
import { removeBooking } from "@/app/_actions/remove-booking";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const isBookingStatus = isFuture(booking.date);

  const handleRemove = async () => {
    setIsRemoveLoading(true);
    try {
      await removeBooking(booking.id);
      toast.success("Agendamento excluido com sucesso", {
        position: "top-right",
        style: {
          borderRadius: "8px",
          backgroundColor: "rgb(16, 111, 84)",
          color: "#fff",
          fontFamily: "Archivo Black",
        },
      });
    } catch (error) {
      console.error("Erro ao remover agendamento");
    } finally {
      setIsRemoveLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="py-0 flex px-0">
            <div className="flex flex-col gap-2 py-3 item-center flex-[3] pl-3">
              <Badge
                variant={isBookingStatus ? "default" : "secondary"}
                className="w-fit"
              >
                {isBookingStatus ? "Em Aberto" : "Finalizado"}
              </Badge>
              <h2>{booking.service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-[1] border-l border-solid border-secondary p-5 ">
              <span className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </span>
              <span className="text-2xl">{format(booking.date, "dd")}</span>
              <span className="text-sm">{format(booking.date, "hh:mm")}</span>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="text-left px-5 pb-6 border-b border-solid border-secondary ">
          <SheetTitle>
            <h1 className="text-2xl font-bold">Informações da reserva</h1>
          </SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src={"/barbershop-map.png"}
              alt={booking.barbershop.name}
              fill
            />
            <CardBarbershop booking={booking} />
          </div>
          <CardBookingDetails
            booking={booking}
            isBookingStatus={isBookingStatus}
          />
          <SheetFooter className="flex flex-row items-center gap-3 mt-6">
            <SheetClose asChild>
              <Button variant={"secondary"} className="w-full">
                Voltar
              </Button>
            </SheetClose>
            <Button
              disabled={!isBookingStatus || isRemoveLoading}
              variant={"destructive"}
              className="w-full"
              onClick={handleRemove}
            >
              {isRemoveLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Deletar
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
