"use client";

import { useActionState } from "react";
import { requestHoldAction, type HoldFormState } from "@/app/actions";
import type { Sailing } from "@/lib/sailings";

const initialState: HoldFormState = {};

export function HoldForm({ sailings }: { sailings: Sailing[] }) {
  const [state, formAction, pending] = useActionState(requestHoldAction, initialState);

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Sailing
        <select
          name="sailingId"
          className="rounded border border-[#d9d1c3] bg-white px-3 py-2"
          defaultValue={sailings[0]?.id ?? ""}
        >
          {sailings.map((sailing) => (
            <option key={sailing.id} value={sailing.id}>
              {sailing.departs} {sailing.destination}
              {sailing.delayed ? " (delayed)" : ""}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Name
        <input name="name" type="text" className="rounded border border-[#d9d1c3] bg-white px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Seats
        <input name="seatCount" type="number" className="rounded border border-[#d9d1c3] bg-white px-3 py-2" />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded border border-[#1c1915] px-3 py-1 text-sm disabled:border-[#d9d1c3]"
      >
        Request hold
      </button>
      {state.code ? (
        <div className="rounded border border-[#d9d1c3] px-4 py-3">
          <p className="text-sm text-[#6b645c]">Confirmation code</p>
          <p className="mt-1 font-mono text-xl">{state.code}</p>
          <p className="mt-2">
            {state.departs} {state.destination}
          </p>
          <p>{state.name}</p>
          <p>{state.seatCount} seats</p>
        </div>
      ) : state.error ? (
        <p className="text-[#8a3b12]" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
