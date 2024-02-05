"use client";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";

interface CardBarbershopProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const CardBarbershop = ({ booking }: CardBarbershopProps) => {
  return (
    <div className="w-full absolute bottom-4 left-0 px-5">
      <Card className="">
        <CardContent className="p-3 flex item-center gap-2">
          <div className="flex item-center">
            <Avatar className="w-11 h-13">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>{booking.barbershop.name}</AvatarFallback>
            </Avatar>
          </div>
          <div className=" flex flex-col items-center">
            <h2 className="font-semibold text-lg">{booking.barbershop.name}</h2>
            <h3 className="text-sm overflow-hidden text-nowrap text-ellipsis">
              {booking.barbershop.address}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardBarbershop;
