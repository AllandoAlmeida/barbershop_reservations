"use server";

import { db } from "@/_lib/prisma";
import { revalidatePath } from "next/cache";

export const removeBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  revalidatePath("/bookings");
};
