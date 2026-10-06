"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { acceptHold, markDelayed, releaseHold, requestHold } from "@/lib/ferry";

export type HoldFormState = {
  code?: string;
  error?: string;
};

function refreshDesk() {
  revalidatePath("/");
  revalidatePath("/hold");
  revalidatePath("/staff");
}

export async function requestHoldAction(
  _previous: HoldFormState,
  formData: FormData,
): Promise<HoldFormState> {
  const sailingId = String(formData.get("sailingId") ?? "");
  const name = String(formData.get("name") ?? "");
  const seatsRaw = String(formData.get("seats") ?? "").trim();
  if (!/^[1-9]\d*$/.test(seatsRaw)) {
    return { error: "Enter a seat count of at least 1." };
  }

  const result = requestHold({
    sailingId,
    name,
    seats: Number(seatsRaw),
  });
  refreshDesk();
  if (!result.ok) {
    return { error: result.error };
  }
  return { code: result.hold.code };
}

export async function markSailingDelayed(formData: FormData) {
  const id = String(formData.get("sailingId") ?? "");
  const result = markDelayed(id);
  refreshDesk();
  if (!result.ok) {
    redirect(`/staff?error=${encodeURIComponent(result.error)}`);
  }
  redirect("/staff");
}

export async function acceptHoldAction(formData: FormData) {
  const id = String(formData.get("holdId") ?? "");
  const result = acceptHold(id);
  refreshDesk();
  if (!result.ok) {
    redirect(`/staff?error=${encodeURIComponent(result.error)}`);
  }
  redirect("/staff");
}

export async function releaseHoldAction(formData: FormData) {
  const id = String(formData.get("holdId") ?? "");
  const result = releaseHold(id);
  refreshDesk();
  if (!result.ok) {
    redirect(`/staff?error=${encodeURIComponent(result.error)}`);
  }
  redirect("/staff");
}
