import { connection } from "next/server";
import { acceptSailingHold, releaseSailingHold } from "@/app/actions";
import { SailingTable } from "@/app/sailing-table";
import { listHolds, listSailings, type HoldStatus } from "@/lib/sailings";

const statusLabel: Record<HoldStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  released: "Released",
};

export default async function StaffPage() {
  await connection();
  const sailings = listSailings();
  const holds = listHolds();
  const sailingById = new Map(sailings.map((sailing) => [sailing.id, sailing]));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Staff</h1>
      <p className="mt-2 text-[#6b645c]">Mark a sailing delayed. Accept or release a hold below.</p>
      <div className="mt-8">
        <SailingTable sailings={sailings} staff />
      </div>
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Holds</h2>
        {holds.length === 0 ? (
          <p className="mt-2 text-[#6b645c]">No holds yet.</p>
        ) : (
          <table className="mt-4 w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#d9d1c3] text-sm text-[#6b645c]">
                <th className="py-2 pr-4 font-medium">Code</th>
                <th className="py-2 pr-4 font-medium">Sailing</th>
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Seats</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {holds.map((hold) => {
                const sailing = sailingById.get(hold.sailingId);
                return (
                  <tr key={hold.code} className="border-b border-[#efeae1]">
                    <td className="py-3 pr-4 font-mono">{hold.code}</td>
                    <td className="py-3 pr-4">
                      {sailing ? `${sailing.departs} ${sailing.destination}` : hold.sailingId}
                    </td>
                    <td className="py-3 pr-4">{hold.name}</td>
                    <td className="py-3 pr-4">{hold.seats}</td>
                    <td className="py-3 pr-4">{statusLabel[hold.status]}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <form action={acceptSailingHold}>
                          <input type="hidden" name="code" value={hold.code} />
                          <button
                            type="submit"
                            disabled={hold.status !== "pending"}
                            className="rounded border border-[#1c1915] px-3 py-1 text-sm disabled:border-[#d9d1c3] disabled:text-[#6b645c]"
                          >
                            Accept
                          </button>
                        </form>
                        <form action={releaseSailingHold}>
                          <input type="hidden" name="code" value={hold.code} />
                          <button
                            type="submit"
                            disabled={hold.status === "released"}
                            className="rounded border border-[#1c1915] px-3 py-1 text-sm disabled:border-[#d9d1c3] disabled:text-[#6b645c]"
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
      </section>
    </main>
  );
}
