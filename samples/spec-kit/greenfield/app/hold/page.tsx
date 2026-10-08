import { connection } from "next/server";
import { requestHold } from "@/app/actions";
import { findHold, listSailings } from "@/lib/ferry";

export default async function HoldPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>;
}) {
  await connection();
  const params = await searchParams;
  const sailings = listSailings();
  const code = params.code?.trim() ?? "";
  const error = params.error?.trim() ?? "";
  const hold = code ? findHold(code) : undefined;
  const heldSailing = hold
    ? sailings.find((sailing) => sailing.id === hold.sailingId)
    : undefined;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Request a hold</h1>
      <p className="mt-2 text-[#5c6570]">
        Choose a sailing, your name, and how many seats. A delayed sailing
        cannot be held.
      </p>

      {hold ? (
        <section className="mt-8 rounded border border-[#1a2332] px-4 py-4">
          <h2 className="text-sm font-medium text-[#5c6570]">Confirmation code</h2>
          <p className="mt-1 font-mono text-3xl tracking-widest">{hold.code}</p>
          <p className="mt-3">
            {heldSailing
              ? `${heldSailing.departs} ${heldSailing.destination}`
              : hold.sailingId}
            {" · "}
            {hold.name}
            {" · "}
            {hold.seats} {hold.seats === 1 ? "seat" : "seats"}
            {" · "}
            {hold.status}
          </p>
        </section>
      ) : null}

      {error ? (
        <p className="mt-8 rounded border border-[#8a3b12] px-4 py-3 text-[#8a3b12]">
          {error}
        </p>
      ) : null}

      <form action={requestHold} className="mt-8 grid max-w-md gap-4">
        <label className="grid gap-1 text-sm">
          Sailing
          <select
            name="sailingId"
            required
            className="border border-[#d5d0c6] bg-white px-3 py-2"
            defaultValue="island-1130"
          >
            {sailings.map((sailing) => (
              <option key={sailing.id} value={sailing.id}>
                {sailing.departs} {sailing.destination}
                {sailing.delayed ? " (delayed)" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Name
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="border border-[#d5d0c6] bg-white px-3 py-2"
          />
        </label>
        <label className="grid gap-1 text-sm">
          Seats
          <input
            name="seats"
            type="number"
            required
            min={1}
            max={12}
            step={1}
            defaultValue={2}
            className="border border-[#d5d0c6] bg-white px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="w-fit rounded border border-[#1a2332] px-4 py-2 text-sm"
        >
          Request hold
        </button>
      </form>
    </main>
  );
}
