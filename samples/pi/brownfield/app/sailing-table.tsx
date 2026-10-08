import { markSailingDelayed } from "@/app/actions";
import type { Sailing } from "@/lib/sailings";

export function SailingTable({
  sailings,
  staff,
}: {
  sailings: Sailing[];
  staff?: boolean;
}) {
  return (
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
              {staff ? (
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
              ) : sailing.delayed ? (
                <span className="text-[#8a3b12]">Delayed</span>
              ) : (
                <span>On time</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
