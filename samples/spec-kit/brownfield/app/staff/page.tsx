import { connection } from "next/server";
import { SailingTable } from "@/app/sailing-table";
import { StaffHolds } from "@/app/staff-holds";
import { listHolds, listSailings } from "@/lib/sailings";

export default async function StaffPage() {
  await connection();
  const sailings = listSailings();
  const holds = listHolds();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">Staff</h1>
      <p className="mt-2 text-[#6b645c]">Mark a sailing delayed. Accept or release a hold below.</p>
      <div className="mt-8">
        <SailingTable sailings={sailings} staff />
      </div>
      <StaffHolds holds={holds} />
    </main>
  );
}
