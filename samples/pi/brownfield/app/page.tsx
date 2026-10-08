import { connection } from "next/server";
import { SailingTable } from "@/app/sailing-table";
import { listSailings } from "@/lib/sailings";

export default async function Home() {
  await connection();
  const sailings = listSailings();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Today&apos;s sailings</h1>
      <p className="mt-2 text-[#6b645c]">North Wharf. Holds are not taken here yet.</p>
      <div className="mt-8">
        <SailingTable sailings={sailings} />
      </div>
    </main>
  );
}
