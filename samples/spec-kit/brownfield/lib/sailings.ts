import { randomInt, randomUUID } from "node:crypto";

export type Sailing = {
  id: string;
  destination: string;
  departs: string;
  delayed: boolean;
};

export type HoldStatus = "requested" | "accepted" | "released";

export type Hold = {
  id: string;
  code: string;
  sailingId: string;
  visitorName: string;
  seatCount: number;
  status: HoldStatus;
};

export type HoldView = Hold & {
  destination: string;
  departs: string;
  delayed: boolean;
};

export type RequestHoldResult =
  | { ok: true; hold: HoldView }
  | { ok: false; reason: string };

type Store = {
  sailings: Sailing[];
  holds: Hold[];
};

const codeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

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
  } else if (!globalStore.__northWharf.holds) {
    globalStore.__northWharf.holds = [];
  }
  return globalStore.__northWharf;
}

function viewHold(hold: Hold): HoldView {
  const sailing = store().sailings.find((item) => item.id === hold.sailingId);
  return {
    ...hold,
    destination: sailing?.destination ?? "",
    departs: sailing?.departs ?? "",
    delayed: sailing?.delayed ?? false,
  };
}

function newCode(holds: Hold[]): string {
  const used = new Set(holds.map((hold) => hold.code));
  for (let attempt = 0; attempt < 10; attempt += 1) {
    let code = "";
    for (let index = 0; index < 8; index += 1) {
      code += codeAlphabet[randomInt(codeAlphabet.length)];
    }
    if (!used.has(code)) {
      return code;
    }
  }
  return "";
}

function parseSeatCount(value: unknown): number | null {
  const text = String(value ?? "").trim();
  if (!/^\d+$/.test(text)) {
    return null;
  }
  const seats = Number(text);
  if (seats < 1 || seats > 20) {
    return null;
  }
  return seats;
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

export function listHolds(): HoldView[] {
  return store().holds.map((hold) => viewHold(hold));
}

export function requestHold(input: {
  sailingId: string;
  name: string;
  seatCount: unknown;
}): RequestHoldResult {
  const sailing = store().sailings.find((item) => item.id === input.sailingId);
  if (!sailing) {
    return { ok: false, reason: "That sailing is not on today's board." };
  }
  if (sailing.delayed) {
    return { ok: false, reason: "A delayed sailing cannot be held." };
  }
  const name = input.name.trim();
  if (!name) {
    return { ok: false, reason: "Name is required." };
  }
  if (name.length > 80) {
    return { ok: false, reason: "Name is too long." };
  }
  const seatCount = parseSeatCount(input.seatCount);
  if (seatCount === null) {
    return { ok: false, reason: "Seat count must be a whole number from 1 to 20." };
  }

  const code = newCode(store().holds);
  if (!code) {
    return { ok: false, reason: "A confirmation code could not be issued." };
  }

  const hold: Hold = {
    id: randomUUID(),
    code,
    sailingId: sailing.id,
    visitorName: name,
    seatCount,
    status: "requested",
  };
  store().holds.push(hold);
  return { ok: true, hold: viewHold(hold) };
}

export function acceptHold(id: string): void {
  const hold = store().holds.find((item) => item.id === id);
  if (hold && hold.status === "requested") {
    hold.status = "accepted";
  }
}

export function releaseHold(id: string): void {
  const hold = store().holds.find((item) => item.id === id);
  if (hold && (hold.status === "requested" || hold.status === "accepted")) {
    hold.status = "released";
  }
}
