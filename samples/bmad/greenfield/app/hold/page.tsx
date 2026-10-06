import { connection } from "next/server";
import { HoldForm } from "@/app/hold/hold-form";
import { listSailings } from "@/lib/ferry";

export default async function HoldPage() {
  await connection();
  const sailings = listSailings();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Request a hold</h1>
      <p className="mt-2 text-[#6b645c]">
        Choose a sailing, your name, and how many seats. A delayed sailing
        cannot be held.
      </p>
      <HoldForm sailings={sailings} />
    </main>
  );
}
