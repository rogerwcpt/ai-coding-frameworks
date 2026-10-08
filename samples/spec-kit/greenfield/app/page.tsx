import { connection } from "next/server";
import { listSailings } from "@/lib/ferry";

export default async function Home() {
  await connection();
  const sailings = listSailings();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Today&apos;s sailings</h1>
      <p className="mt-2 text-[#5c6570]">
        North Wharf. Delayed sailings are marked on this board.
      </p>
      <table className="mt-8 w-full border-collapse text-left">
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
                  <span>On time</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
