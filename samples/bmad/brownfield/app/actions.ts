"use server";

import { revalidatePath } from "next/cache";
import { acceptHold, createHold, markDelayed, releaseHold, type HoldError } from "@/lib/sailings";

const holdErrors: Record<HoldError, string> = {
  sailing: "Choose a sailing.",
  delayed: "That sailing is delayed and cannot be held.",
  name: "Enter the name for the hold.",
  seats: "Enter a seat count of at least 1.",
};

export type HoldFormState = {
  code: string | null;
  error: string | null;
};

export async function markSailingDelayed(formData: FormData) {
  const id = String(formData.get("sailingId") ?? "");
  if (id) {
    markDelayed(id);
  }
  revalidatePath("/");
  revalidatePath("/staff");
}

export async function requestSailingHold(
  _previous: HoldFormState,
  formData: FormData,
): Promise<HoldFormState> {
  const sailingId = String(formData.get("sailingId") ?? "");
  const name = String(formData.get("name") ?? "");
  const seats = Number(formData.get("seats"));
  const result = createHold({ sailingId, name, seats });
  revalidatePath("/hold");
  revalidatePath("/staff");
  if (!result.ok) {
    return { code: null, error: holdErrors[result.error] };
  }
  return { code: result.hold.code, error: null };
}

export async function acceptSailingHold(formData: FormData) {
  const code = String(formData.get("code") ?? "");
  if (code) {
    acceptHold(code);
  }
  revalidatePath("/staff");
}

export async function releaseSailingHold(formData: FormData) {
  const code = String(formData.get("code") ?? "");
  if (code) {
    releaseHold(code);
  }
  revalidatePath("/staff");
}
