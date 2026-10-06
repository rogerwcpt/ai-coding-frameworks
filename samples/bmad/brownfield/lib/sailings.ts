export type Sailing = {
  id: string;
  destination: string;
  departs: string;
  delayed: boolean;
};

export type HoldStatus = "pending" | "accepted" | "released";

export type Hold = {
  code: string;
  sailingId: string;
  name: string;
  seats: number;
  status: HoldStatus;
};

export type HoldError = "sailing" | "delayed" | "name" | "seats";

type Store = {
  sailings: Sailing[];
  holds: Hold[];
};

const seed = (): Sailing[] => [
  { id: "island-0900", destination: "The Island", departs: "09:00", delayed: false },
  { id: "green-1115", destination: "Green Jetty", departs: "11:15", delayed: false },
  { id: "breakwater-1400", destination: "The Breakwater", departs: "14:00", delayed: false },
  { id: "island-1630", destination: "The Island", departs: "16:30", delayed: false },
];

function store(): Store {
  const globalStore = globalThis as typeof globalThis & { __northWharf?: Store };
  if (!globalStore.__northWharf) {
    globalStore.__northWharf = { sailings: seed(), holds: [] };
  }
  if (!globalStore.__northWharf.holds) {
    globalStore.__northWharf.holds = [];
  }
  return globalStore.__northWharf;
}

const codeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function confirmationCode(existing: Set<string>): string {
  for (let attempt = 0; attempt < 20; attempt++) {
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    let code = "";
    for (const byte of bytes) {
      code += codeAlphabet[byte % codeAlphabet.length];
    }
    if (!existing.has(code)) {
      return code;
    }
  }
  throw new Error("Could not allocate a confirmation code");
}

export function listSailings(): Sailing[] {
  return store().sailings.map((sailing) => ({ ...sailing }));
}

export function markDelayed(id: string): void {
  const sailing = store().sailings.find((item) => item.id === id);
  if (sailing) {
    sailing.delayed = true;
  }
}

export function listHolds(): Hold[] {
  return store()
    .holds.map((hold) => ({ ...hold }))
    .reverse();
}

export function createHold(input: {
  sailingId: string;
  name: string;
  seats: number;
}): { ok: true; hold: Hold } | { ok: false; error: HoldError } {
  const name = input.name.trim();
  if (!name) {
    return { ok: false, error: "name" };
  }
  if (!Number.isSafeInteger(input.seats) || input.seats < 1) {
    return { ok: false, error: "seats" };
  }

  const sailing = store().sailings.find((item) => item.id === input.sailingId);
  if (!sailing) {
    return { ok: false, error: "sailing" };
  }
  if (sailing.delayed) {
    return { ok: false, error: "delayed" };
  }

  const holds = store().holds;
  const hold: Hold = {
    code: confirmationCode(new Set(holds.map((item) => item.code))),
    sailingId: sailing.id,
    name,
    seats: input.seats,
    status: "pending",
  };
  holds.push(hold);
  return { ok: true, hold: { ...hold } };
}

export function acceptHold(code: string): void {
  const hold = store().holds.find((item) => item.code === code);
  if (hold?.status === "pending") {
    hold.status = "accepted";
  }
}

export function releaseHold(code: string): void {
  const hold = store().holds.find((item) => item.code === code);
  if (hold && hold.status !== "released") {
    hold.status = "released";
  }
}
