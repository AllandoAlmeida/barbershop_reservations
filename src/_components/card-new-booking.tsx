import { Card, CardContent } from "@/_components/ui/card";
import { Barbershop, Service } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface CardNewBookingProps {
  barbershop: Barbershop;
  service: Service;
  date: Date | undefined;
  hour: string | undefined;
}

const CardNewBooking = ({
  service,
  barbershop,
  date,
  hour,
}: CardNewBookingProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-3">
        <div className="flex justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <h3 className="font-bold text-sm">
            {""}
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </h3>
        </div>
        {date && (
          <div className="flex justify-between">
            <h3 className="text-gray-400 text-sm">Data</h3>
            <h4 className="text-sm">
              {format(date, "dd 'de ' MMMM", {
                locale: ptBR,
              })}
            </h4>
          </div>
        )}
        {hour && (
          <div className="flex justify-between">
            <h3 className="text-gray-400 text-sm">horário</h3>
            <h4 className="text-sm">{hour}</h4>
          </div>
        )}

        <div className="flex justify-between">
          <h3 className="text-gray-400 text-sm">Barbearia</h3>
          <h4 className="text-sm">{barbershop.name}</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardNewBooking;
