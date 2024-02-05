import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { Button } from "./ui/button";

interface CardBookingDetailsProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
  isBookingStatus: boolean;
}

export const CardBookingDetails = ({
  booking,
  isBookingStatus,
}: CardBookingDetailsProps) => {
  return (
    <div>
      <div className="flex flex-col gap-2 py-4 item-center flex-[3]">
        <Badge
          variant={isBookingStatus ? "default" : "secondary"}
          className="w-fit"
        >
          {isBookingStatus ? "Em Aberto" : "Finalizado"}
        </Badge>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 p-3">
          <div className="flex justify-between">
            <h2 className="font-bold">{booking.service.name}</h2>
            <h3 className="font-bold text-sm">
              {""}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(booking.service.price))}
            </h3>
          </div>

          <div className="flex justify-between">
            <h3 className="text-gray-400 text-sm">Data</h3>
            <h4 className="text-sm">
              {format(booking.date, "dd 'de'  MMMM ", { locale: ptBR })}
            </h4>
          </div>

          <div className="flex justify-between">
            <h3 className="text-gray-400 text-sm">horário</h3>
            <h4 className="text-sm">{format(booking.date, "HH:mm")}</h4>
          </div>

          <div className="flex justify-between">
            <h3 className="text-gray-400 text-sm">Barbearia</h3>
            <h4 className="text-sm">{booking.barbershop.name}</h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
