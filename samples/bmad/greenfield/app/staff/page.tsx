import { connection } from "next/server";
import {
  acceptHoldAction,
  markSailingDelayed,
  releaseHoldAction,
} from "@/app/actions";
import { listHolds, listSailings } from "@/lib/ferry";

export default async function StaffPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await connection();
  const { error } = await searchParams;
  const sailings = listSailings();
  const holds = listHolds();
  const sailingById = new Map(sailings.map((sailing) => [sailing.id, sailing]));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Staff</h1>
      <p className="mt-2 text-[#6b645c]">
        Mark a sailing delayed, or accept or release a hold.
      </p>
      {error ? (
        <p role="alert" className="mt-4 text-[#8a3b12]">
          {error}
        </p>
      ) : null}

      <h2 className="mt-8 text-lg font-semibold">Sailings</h2>
      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#d9d1c3] text-sm text-[#6b645c]">
            <th className="py-2 pr-4 font-medium">Departs</th>
            <th className="py-2 pr-4 font-medium">To</th>
            <th className="py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {sailings.map((sailing) => (
            <tr key={sailing.id} className="border-b border-[#efeae1]">
              <td className="py-3 pr-4 font-mono">{sailing.departs}</td>
              <td className="py-3 pr-4">{sailing.destination}</td>
              <td className="py-3">
                <form action={markSailingDelayed}>
                  <input type="hidden" name="sailingId" value={sailing.id} />
                  <button
                    type="submit"
                    disabled={sailing.delayed}
                    className="rounded border border-[#1c1915] px-3 py-1 text-sm disabled:border-[#d9d1c3] disabled:text-[#8a3b12]"
                  >
                    {sailing.delayed ? "Delayed" : "Mark delayed"}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-10 text-lg font-semibold">Holds</h2>
      {holds.length === 0 ? (
        <p className="mt-4 text-[#6b645c]">No holds yet.</p>
      ) : (
        <table className="mt-4 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d9d1c3] text-sm text-[#6b645c]">
              <th className="py-2 pr-4 font-medium">Code</th>
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">Sailing</th>
              <th className="py-2 pr-4 font-medium">Seats</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 font-medium">Desk</th>
            </tr>
          </thead>
          <tbody>
            {holds.map((hold) => {
              const sailing = sailingById.get(hold.sailingId);
              const sailingDelayed = sailing?.delayed ?? false;
              return (
                <tr key={hold.id} className="border-b border-[#efeae1]">
                  <td className="py-3 pr-4 font-mono">{hold.code}</td>
                  <td className="py-3 pr-4">{hold.name}</td>
                  <td className="py-3 pr-4">
                    {sailing
                      ? `${sailing.departs} ${sailing.destination}`
                      : hold.sailingId}
                    {sailingDelayed ? " (delayed)" : ""}
                  </td>
                  <td className="py-3 pr-4">{hold.seats}</td>
                  <td className="py-3 pr-4 capitalize">{hold.status}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <form action={acceptHoldAction}>
                        <input type="hidden" name="holdId" value={hold.id} />
                        <button
                          type="submit"
                          disabled={hold.status !== "pending" || sailingDelayed}
                          className="rounded border border-[#1c1915] px-3 py-1 text-sm disabled:border-[#d9d1c3]"
                        >
                          Accept
                        </button>
                      </form>
                      <form action={releaseHoldAction}>
                        <input type="hidden" name="holdId" value={hold.id} />
                        <button
                          type="submit"
                          disabled={hold.status === "released"}
                          className="rounded border border-[#1c1915] px-3 py-1 text-sm disabled:border-[#d9d1c3]"
                        >
                          Release
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}
