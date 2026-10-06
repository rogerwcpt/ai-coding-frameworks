import { randomInt } from "node:crypto";

export type Sailing = {
  id: string;
  destination: string;
  departs: string;
  delayed: boolean;
};

export type HoldStatus = "pending" | "accepted" | "released";

export type Hold = {
  id: string;
  code: string;
  sailingId: string;
  name: string;
  seats: number;
  status: HoldStatus;
};

export type HoldResult =
  | { ok: true; hold: Hold }
  | { ok: false; error: string };

type Store = {
  sailings: Sailing[];
  holds: Hold[];
  nextHold: number;
};

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function seedSailings(): Sailing[] {
  return [
    {
      id: "island-0900",
      destination: "The Island",
      departs: "09:00",
      delayed: true,
    },
    {
      id: "green-1115",
      destination: "Green Jetty",
      departs: "11:15",
      delayed: false,
    },
    {
      id: "breakwater-1400",
      destination: "The Breakwater",
      departs: "14:00",
      delayed: false,
    },
    {
      id: "island-1630",
      destination: "The Island",
      departs: "16:30",
      delayed: false,
    },
  ];
}

function store(): Store {
  const globalStore = globalThis as typeof globalThis & {
    __northWharfFerries?: Store;
  };
  if (!globalStore.__northWharfFerries) {
    globalStore.__northWharfFerries = {
      sailings: seedSailings(),
      holds: [],
      nextHold: 1,
    };
  }
  return globalStore.__northWharfFerries;
}

export function listSailings(): Sailing[] {
  return store().sailings.map((sailing) => ({ ...sailing }));
}

export function listHolds(): Hold[] {
  return store().holds.map((hold) => ({ ...hold }));
}

function findSailing(id: string): Sailing | undefined {
  return store().sailings.find((sailing) => sailing.id === id);
}

function confirmationCode(): string {
  let code = "NW-";
  for (let index = 0; index < 4; index += 1) {
    code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  }
  return code;
}

function uniqueCode(): string {
  const existing = new Set(store().holds.map((hold) => hold.code));
  let code = confirmationCode();
  while (existing.has(code)) {
    code = confirmationCode();
  }
  return code;
}

export function requestHold(input: {
  sailingId: string;
  name: string;
  seats: number;
}): HoldResult {
  const sailing = findSailing(input.sailingId);
  if (!sailing) {
    return { ok: false, error: "Choose a sailing." };
  }
  if (sailing.delayed) {
    return { ok: false, error: "A delayed sailing cannot be held." };
  }

  const name = input.name.trim();
  if (!name) {
    return { ok: false, error: "Enter the name for the hold." };
  }
  if (!Number.isSafeInteger(input.seats) || input.seats < 1) {
    return { ok: false, error: "Enter a seat count of at least 1." };
  }

  const current = store();
  const hold: Hold = {
    id: `hold-${current.nextHold}`,
    code: uniqueCode(),
    sailingId: sailing.id,
    name,
    seats: input.seats,
    status: "pending",
  };
  current.nextHold += 1;
  current.holds.push(hold);
  return { ok: true, hold: { ...hold } };
}

export function markDelayed(
  id: string,
): { ok: true } | { ok: false; error: string } {
  const sailing = findSailing(id);
  if (!sailing) {
    return { ok: false, error: "That sailing is not on today's board." };
  }
  sailing.delayed = true;
  return { ok: true };
}

export function acceptHold(id: string): HoldResult {
  const hold = store().holds.find((item) => item.id === id);
  if (!hold) {
    return { ok: false, error: "That hold is not on the desk." };
  }
  if (hold.status !== "pending") {
    return { ok: false, error: "Only a pending hold can be accepted." };
  }
  const sailing = findSailing(hold.sailingId);
  if (!sailing) {
    return { ok: false, error: "That sailing is not on today's board." };
  }
  if (sailing.delayed) {
    return { ok: false, error: "A delayed sailing cannot be held." };
  }
  hold.status = "accepted";
  return { ok: true, hold: { ...hold } };
}

export function releaseHold(id: string): HoldResult {
  const hold = store().holds.find((item) => item.id === id);
  if (!hold) {
    return { ok: false, error: "That hold is not on the desk." };
  }
  if (hold.status === "released") {
    return { ok: false, error: "That hold is already released." };
  }
  hold.status = "released";
  return { ok: true, hold: { ...hold } };
}
