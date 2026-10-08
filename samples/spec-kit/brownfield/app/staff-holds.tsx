import { acceptHoldAction, releaseHoldAction } from "@/app/actions";
import type { HoldView } from "@/lib/sailings";

export function StaffHolds({ holds }: { holds: HoldView[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold">Holds</h2>
      {holds.length === 0 ? (
        <p className="mt-2 text-[#6b645c]">No holds yet.</p>
      ) : (
        <table className="mt-4 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d9d1c3] text-sm text-[#6b645c]">
              <th className="py-2 pr-4 font-medium">Departs</th>
              <th className="py-2 pr-4 font-medium">To</th>
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">Seats</th>
              <th className="py-2 pr-4 font-medium">Code</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {holds.map((hold) => (
              <tr key={hold.id} className="border-b border-[#efeae1]">
                <td className="py-3 pr-4 font-mono">{hold.departs}</td>
                <td className="py-3 pr-4">{hold.destination}</td>
                <td className="py-3 pr-4">{hold.visitorName}</td>
                <td className="py-3 pr-4">{hold.seatCount}</td>
                <td className="py-3 pr-4 font-mono">{hold.code}</td>
                <td className="py-3 pr-4">{hold.status}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    {hold.status === "requested" ? (
                      <form action={acceptHoldAction}>
                        <input type="hidden" name="holdId" value={hold.id} />
                        <button
                          type="submit"
                          className="rounded border border-[#1c1915] px-3 py-1 text-sm"
                        >
                          Accept
                        </button>
                      </form>
                    ) : null}
                    {hold.status === "requested" || hold.status === "accepted" ? (
                      <form action={releaseHoldAction}>
                        <input type="hidden" name="holdId" value={hold.id} />
                        <button
                          type="submit"
                          className="rounded border border-[#1c1915] px-3 py-1 text-sm"
                        >
                          Release
                        </button>
                      </form>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
