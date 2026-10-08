"use server";

import { revalidatePath } from "next/cache";
import { markDelayed } from "@/lib/sailings";

export async function markSailingDelayed(formData: FormData) {
  const id = String(formData.get("sailingId") ?? "");
  if (id) {
    markDelayed(id);
  }
  revalidatePath("/");
  revalidatePath("/staff");
}
