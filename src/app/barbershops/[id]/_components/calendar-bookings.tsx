import { Calendar } from "@/_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../../../_helpers/hours";
import { Button } from "@/_components/ui/button";
import { Barbershop, Booking, Service } from "@prisma/client";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { SheetFooter } from "@/_components/ui/sheet";
import { saveBooking } from "../../../_actions/save-bookings";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../../../_actions/get-day-bookings";
import CardNewBooking from "@/_components/card-new-booking";

interface CalendarBookingsProps {
  barbershop: Barbershop;
  service: Service;
  setSheetIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarBookings = ({
  service,
  barbershop,
  setSheetIsOpen,
}: CalendarBookingsProps) => {
  const router = useRouter();
  const { data } = useSession();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  console.log({ dayBookings });

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const listDayBookings = await getDayBookings(barbershop.id, date);
      setDayBookings(listDayBookings);
    };

    refreshAvailableHours();
  }, [date, barbershop.id]);

  const handleSelectDate = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const timeList = useMemo(() => {
    if (!date) {
      return [];
    }
    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour == timeHour && bookingMinutes == timeMinutes;
      });

      if (!booking) {
        return true; // No hay una cita en ese momento de tiempo
      }

      return false;
    });
  }, [date, dayBookings]);

  const handlerSelectHour = (time: string) => {
    setHour(time);
  };

  const handleCreateBooking = async () => {
    setLoading(true);
    try {
      if (!date || !hour || !data?.user) {
        throw new Error("Selecione data e hora para a reserva");
      }

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      });
      setSheetIsOpen(false);
      setHour(undefined),
        setDate(undefined),
        toast.success("Reserva realiza com Sucesso", {
          position: "top-right",
          style: {
            borderRadius: "8px",
            backgroundColor: "rgb(16, 111, 84)",
            color: "#fff",
            fontFamily: "Archivo Black",
          },
          description: format(newDate, "'Para' dd 'de' MMMM',' H:mm", {
            locale: ptBR,
          }),
        });
      router.push("/bookings");
    } catch (error) {
      toast.error("Event has not been created");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="py-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          locale={ptBR}
          fromDate={addDays(new Date(), 1)} /* limitar a data inicial */
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
        <CardNewBooking
          service={service}
          date={date}
          hour={hour}
          barbershop={barbershop}
        />
        <SheetFooter className="py-6">
          <Button
            onClick={handleCreateBooking}
            disabled={!hour || !date || loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirmar reserva
          </Button>
        </SheetFooter>
      </div>
    </div>
  );
};

export default CalendarBookings;
