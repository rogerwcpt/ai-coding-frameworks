export type Sailing = {
  id: string;
  destination: string;
  departs: string;
  delayed: boolean;
};

export type HoldStatus = "requested" | "accepted" | "released";

export type Hold = {
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
};

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const seed = (): Sailing[] => [
  { id: "harbour-0900", destination: "Harbour Mouth", departs: "09:00", delayed: false },
  { id: "island-1130", destination: "Robben Island", departs: "11:30", delayed: false },
  { id: "harbour-1400", destination: "Harbour Mouth", departs: "14:00", delayed: false },
  { id: "island-1630", destination: "Robben Island", departs: "16:30", delayed: false },
];

function store(): Store {
  const globalStore = globalThis as typeof globalThis & {
    __northWharfFerry?: Store;
  };
  if (!globalStore.__northWharfFerry) {
    globalStore.__northWharfFerry = { sailings: seed(), holds: [] };
  }
  return globalStore.__northWharfFerry;
}

export function listSailings(): Sailing[] {
  return store().sailings.map((sailing) => ({ ...sailing }));
}

export function listHolds(): Hold[] {
  return store().holds.map((hold) => ({ ...hold }));
}

export function findHold(code: string): Hold | undefined {
  const hold = store().holds.find((item) => item.code === code);
  return hold ? { ...hold } : undefined;
}

function nextCode(): string {
  const existing = store().holds;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    let code = "";
    for (let index = 0; index < 6; index += 1) {
      code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
    }
    if (!existing.some((hold) => hold.code === code)) {
      return code;
    }
  }
  throw new Error("Could not allocate a confirmation code");
}

export function requestHold(input: {
  sailingId: string;
  name: string;
  seats: number;
}): HoldResult {
  const sailing = store().sailings.find((item) => item.id === input.sailingId);
  if (!sailing) {
    return { ok: false, error: "That sailing is not on today's board." };
  }
  if (sailing.delayed) {
    return {
      ok: false,
      error: "A delayed sailing cannot be held.",
    };
  }

  const name = input.name.trim();
  if (!name) {
    return { ok: false, error: "Enter a name." };
  }

  if (!Number.isInteger(input.seats) || input.seats < 1 || input.seats > 12) {
    return {
      ok: false,
      error: "Seat count must be a whole number from 1 to 12.",
    };
  }

  const hold: Hold = {
    code: nextCode(),
    sailingId: sailing.id,
    name,
    seats: input.seats,
    status: "requested",
  };
  store().holds.push(hold);
  return { ok: true, hold: { ...hold } };
}

export function markDelayed(id: string): void {
  const sailing = store().sailings.find((item) => item.id === id);
  if (!sailing) {
    return;
  }
  sailing.delayed = true;
}

export type StaffMutation =
  | { ok: true }
  | { ok: false; error?: string };

export function acceptHold(code: string): StaffMutation {
  const hold = store().holds.find((item) => item.code === code);
  if (!hold) {
    return { ok: false, error: "That hold does not exist." };
  }
  if (hold.status !== "requested") {
    return { ok: false };
  }
  hold.status = "accepted";
  return { ok: true };
}

export function releaseHold(code: string): StaffMutation {
  const hold = store().holds.find((item) => item.code === code);
  if (!hold) {
    return { ok: false, error: "That hold does not exist." };
  }
  if (hold.status === "released") {
    return { ok: false };
  }
  if (hold.status !== "requested" && hold.status !== "accepted") {
    return { ok: false };
  }
  hold.status = "released";
  return { ok: true };
}
