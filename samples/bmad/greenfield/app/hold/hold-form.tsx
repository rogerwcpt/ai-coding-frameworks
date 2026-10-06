"use client";

import { useActionState } from "react";
import { requestHoldAction, type HoldFormState } from "@/app/actions";
import type { Sailing } from "@/lib/ferry";

const initialState: HoldFormState = {};

export function HoldForm({ sailings }: { sailings: Sailing[] }) {
  const [state, formAction, pending] = useActionState(
    requestHoldAction,
    initialState,
  );
  const defaultSailing =
    sailings.find((sailing) => !sailing.delayed)?.id ?? sailings[0]?.id;

  return (
    <form action={formAction} className="mt-8 grid max-w-md gap-4">
      <label className="grid gap-1 text-sm" htmlFor="sailingId">
        Sailing
        <select
          id="sailingId"
          name="sailingId"
          defaultValue={defaultSailing}
          className="border border-[#d9d1c3] bg-white px-3 py-2"
        >
          {sailings.map((sailing) => (
            <option key={sailing.id} value={sailing.id}>
              {sailing.departs} {sailing.destination}
              {sailing.delayed ? " (delayed)" : ""}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm" htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="border border-[#d9d1c3] bg-white px-3 py-2"
        />
      </label>
      <label className="grid gap-1 text-sm" htmlFor="seats">
        Seat count
        <input
          id="seats"
          name="seats"
          type="number"
          min={1}
          step={1}
          required
          defaultValue={2}
          className="border border-[#d9d1c3] bg-white px-3 py-2"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded border border-[#1c1915] px-3 py-1 text-sm disabled:border-[#d9d1c3]"
      >
        {pending ? "Requesting…" : "Request hold"}
      </button>
      {state.code ? (
        <p>
          Confirmation code <strong>{state.code}</strong>
        </p>
      ) : null}
      {state.error ? (
        <p role="alert" className="text-[#8a3b12]">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
