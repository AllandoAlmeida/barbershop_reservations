import { Calendar } from "@/_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { Button } from "@/_components/ui/button";
import { Barbershop, Service } from "@prisma/client";
import { Card, CardContent } from "@/_components/ui/card";
import { format } from "date-fns";
import { SheetFooter } from "@/_components/ui/sheet";

interface CalendarBookingsProps {
  barbershop: Barbershop;
  service: Service;
}

const CalendarBookings = ({ service, barbershop }: CalendarBookingsProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();

  const handleSelectDate = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  const handlerSelectHour = (time: string) => {
    setHour(time);
  };

  return (
    <div>
      <div className="py-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          locale={ptBR}
          fromDate={new Date()} /* limitar a data inicial */
          styles={{
            head_cell: {
              width: "100%",
              textTransform: "capitalize",
            },
            cell: {
              width: "100%",
            },
            button: {
              width: "100%",
            },
            nav_button_previous: {
              width: "24px",
              height: "24px",
            },
            nav_button_next: {
              width: "24px",
              height: "24px",
            },
            caption: {
              textTransform: "capitalize",
            },
          }}
        />

        {/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
        {date && (
          <div className="flex gap-3 overflow-x-auto py-3 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
            {timeList.map((time) => (
              <Button
                onClick={() => handlerSelectHour(time)}
                variant={hour === time ? "default" : "outline"}
                className="rounded-full"
                key={time}
              >
                {time}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="px-5 pb-6">
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
        <SheetFooter className="py-6">
          <Button disabled={!hour || !date}>Confirmar reserva</Button>
        </SheetFooter>
      </div>
    </div>
  );
};

export default CalendarBookings;