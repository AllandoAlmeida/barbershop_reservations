import { Card, CardContent } from "@/_components/ui/card";
import { Service } from "@prisma/client";

interface CalendarBookingsProps {
  service: Service;
}

const BookingSummary = ({ service }: CalendarBookingsProps) => {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <h3 className="font-bold text-sm">
            {""}
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(service.price)}
          </h3>
          {date && (
            <div className="flex justify-between"
          )}
          <h2 className="font-bold">{service.name}</h2>
          <h2 className="font-bold">{service.name}</h2>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
