import { connection } from "next/server";
import Link from "next/link";
import { listSailings } from "@/lib/ferry";

export default async function Home() {
  await connection();
  const sailings = listSailings();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Today&apos;s sailings</h1>
      <p className="mt-2 text-[#6b645c]">
        North Wharf. Delayed sailings are marked and cannot be held.
      </p>
      <div className="mt-8">
        <table className="w-full border-collapse text-left">
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
      </div>
      <p className="mt-8">
        <Link href="/hold" className="underline">
          Request a hold
        </Link>
      </p>
    </main>
  );
}
