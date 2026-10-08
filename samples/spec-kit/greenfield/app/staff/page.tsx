import { connection } from "next/server";
import { acceptHold, markDelayed, releaseHold } from "@/app/actions";
import { listHolds, listSailings } from "@/lib/ferry";

export default async function StaffPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  await connection();
  const params = await searchParams;
  const notice = params.notice?.trim() ?? "";
  const sailings = listSailings();
  const holds = listHolds();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Staff</h1>
      <p className="mt-2 text-[#5c6570]">
        Mark a sailing delayed, accept a hold, or release a hold.
      </p>
      {notice ? (
        <p className="mt-6 rounded border border-[#8a3b12] px-4 py-3 text-[#8a3b12]">
          {notice}
        </p>
      ) : null}

      <h2 className="mt-8 text-lg font-semibold">Sailings</h2>
      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#d5d0c6] text-sm text-[#5c6570]">
            <th className="py-2 pr-4 font-medium">Departs</th>
            <th className="py-2 pr-4 font-medium">To</th>
            <th className="py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {sailings.map((sailing) => (
            <tr key={sailing.id} className="border-b border-[#e7e2d8]">
              <td className="py-3 pr-4 font-mono">{sailing.departs}</td>
              <td className="py-3 pr-4">{sailing.destination}</td>
              <td className="py-3">
                {sailing.delayed ? (
                  <span className="text-[#8a3b12]">Delayed</span>
                ) : (
                  <form action={markDelayed}>
                    <input type="hidden" name="sailingId" value={sailing.id} />
                    <button
                      type="submit"
                      className="rounded border border-[#1a2332] px-3 py-1 text-sm"
                    >
                      Mark delayed
                    </button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-10 text-lg font-semibold">Holds</h2>
      {holds.length === 0 ? (
        <p className="mt-4 text-[#5c6570]">No holds yet.</p>
      ) : (
        <table className="mt-4 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#d5d0c6] text-sm text-[#5c6570]">
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
              const sailing = sailings.find((item) => item.id === hold.sailingId);
              return (
                <tr key={hold.code} className="border-b border-[#e7e2d8]">
                  <td className="py-3 pr-4 font-mono">{hold.code}</td>
                  <td className="py-3 pr-4">
                    {sailing
                      ? `${sailing.departs} ${sailing.destination}`
                      : hold.sailingId}
                  </td>
                  <td className="py-3 pr-4">{hold.name}</td>
                  <td className="py-3 pr-4">{hold.seats}</td>
                  <td className="py-3 pr-4">{hold.status}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      {hold.status === "requested" ? (
                        <form action={acceptHold}>
                          <input type="hidden" name="code" value={hold.code} />
                          <button
                            type="submit"
                            className="rounded border border-[#1a2332] px-3 py-1 text-sm"
                          >
                            Accept
                          </button>
                        </form>
                      ) : null}
                      {hold.status === "requested" || hold.status === "accepted" ? (
                        <form action={releaseHold}>
                          <input type="hidden" name="code" value={hold.code} />
                          <button
                            type="submit"
                            className="rounded border border-[#1a2332] px-3 py-1 text-sm"
                          >
                            Release
                          </button>
                        </form>
                      ) : null}
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
