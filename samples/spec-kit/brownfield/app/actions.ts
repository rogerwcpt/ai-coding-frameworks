"use server";

import { revalidatePath } from "next/cache";
import { acceptHold, markDelayed, releaseHold, requestHold } from "@/lib/sailings";

export type HoldFormState = {
  code?: string;
  departs?: string;
  destination?: string;
  name?: string;
  seatCount?: number;
  error?: string;
};

export async function markSailingDelayed(formData: FormData) {
  const id = String(formData.get("sailingId") ?? "");
  if (id) {
    markDelayed(id);
  }
  revalidatePath("/");
  revalidatePath("/staff");
}

export async function requestHoldAction(
  _prevState: HoldFormState,
  formData: FormData,
): Promise<HoldFormState> {
  const result = requestHold({
    sailingId: String(formData.get("sailingId") ?? ""),
    name: String(formData.get("name") ?? ""),
    seatCount: formData.get("seatCount"),
  });
  revalidatePath("/hold");
  revalidatePath("/staff");
  if (!result.ok) {
    return { error: result.reason };
  }
  return {
    code: result.hold.code,
    departs: result.hold.departs,
    destination: result.hold.destination,
    name: result.hold.visitorName,
    seatCount: result.hold.seatCount,
  };
}

export async function acceptHoldAction(formData: FormData) {
  const id = String(formData.get("holdId") ?? "");
  if (id) {
    acceptHold(id);
  }
  revalidatePath("/staff");
  revalidatePath("/hold");
}

export async function releaseHoldAction(formData: FormData) {
  const id = String(formData.get("holdId") ?? "");
  if (id) {
    releaseHold(id);
  }
  revalidatePath("/staff");
  revalidatePath("/hold");
}
