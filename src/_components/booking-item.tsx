import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { format, isFuture, isPast } from "date-fns";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingStatus = isFuture(booking.date);
  return (
    <Card className="min-w-full">
      <CardContent className="py-0 flex px-0">
        <div className="flex flex-col gap-2 py-3 item-center flex-[3] pl-3">
          <Badge
            variant={isBookingStatus ? "default" : "secondary"}
            className="w-fit"
          >
            {isBookingStatus ? "Em Aberto" : "Finalizado" }
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
  );
};

export default BookingItem;
