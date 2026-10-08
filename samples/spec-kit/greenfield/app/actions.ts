"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  acceptHold as acceptStoredHold,
  markDelayed as markStoredDelayed,
  releaseHold as releaseStoredHold,
  requestHold as requestStoredHold,
} from "@/lib/ferry";

function refreshCounter() {
  revalidatePath("/");
  revalidatePath("/hold");
  revalidatePath("/staff");
}

function parseSeats(raw: string): number {
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) {
    return Number.NaN;
  }
  return Number(trimmed);
}

export async function requestHold(formData: FormData) {
  const sailingId = String(formData.get("sailingId") ?? "");
  const name = String(formData.get("name") ?? "");
  const seats = parseSeats(String(formData.get("seats") ?? ""));
  const result = requestStoredHold({ sailingId, name, seats });
  refreshCounter();
  if (result.ok) {
    redirect(`/hold?code=${encodeURIComponent(result.hold.code)}`);
  }
  redirect(`/hold?error=${encodeURIComponent(result.error)}`);
}

export async function markDelayed(formData: FormData) {
  const sailingId = String(formData.get("sailingId") ?? "");
  markStoredDelayed(sailingId);
  refreshCounter();
  redirect("/staff");
}

function staffRedirect(result: { ok: boolean; error?: string }): never {
  refreshCounter();
  if (!result.ok && result.error) {
    redirect(`/staff?notice=${encodeURIComponent(result.error)}`);
  }
  redirect("/staff");
}

export async function acceptHold(formData: FormData) {
  const code = String(formData.get("code") ?? "");
  staffRedirect(acceptStoredHold(code));
}

export async function releaseHold(formData: FormData) {
  const code = String(formData.get("code") ?? "");
  staffRedirect(releaseStoredHold(code));
}
