"use client";

import { useActionState } from "react";
import { requestSailingHold, type HoldFormState } from "@/app/actions";
import type { Sailing } from "@/lib/sailings";

const initialState: HoldFormState = { code: null, error: null };

export function HoldForm({ sailings }: { sailings: Sailing[] }) {
  const [state, formAction, pending] = useActionState(requestSailingHold, initialState);

  return (
    <form action={formAction} className="mt-8 flex max-w-md flex-col gap-4">
      <label className="block text-sm text-[#6b645c]" htmlFor="sailingId">
        Sailing
        <select
          id="sailingId"
          name="sailingId"
          required
          defaultValue=""
          className="mt-1 block w-full rounded border border-[#d9d1c3] bg-white px-3 py-2 text-base text-[#1c1915]"
        >
          <option value="" disabled>
            Choose a sailing
          </option>
          {sailings.map((sailing) => (
            <option key={sailing.id} value={sailing.id}>
              {sailing.departs} to {sailing.destination}
              {sailing.delayed ? " (delayed)" : ""}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-[#6b645c]" htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-1 block w-full rounded border border-[#d9d1c3] bg-white px-3 py-2 text-base text-[#1c1915]"
        />
      </label>
      <label className="block text-sm text-[#6b645c]" htmlFor="seats">
        Seats
        <input
          id="seats"
          name="seats"
          type="number"
          min={1}
          step={1}
          required
          defaultValue={1}
          className="mt-1 block w-full rounded border border-[#d9d1c3] bg-white px-3 py-2 text-base text-[#1c1915]"
        />
      </label>
      {state.code ? (
        <p className="rounded border border-[#1c1915] px-3 py-2" role="status">
          Confirmation code <span className="font-mono font-semibold">{state.code}</span>
        </p>
      ) : null}
      {state.error ? (
        <p className="text-[#8a3b12]" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded border border-[#1c1915] px-3 py-1 text-sm disabled:border-[#d9d1c3]"
      >
        {pending ? "Requesting hold" : "Request hold"}
      </button>
    </form>
  );
}
