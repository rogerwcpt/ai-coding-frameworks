export type Sailing = {
  id: string;
  destination: string;
  departs: string;
  delayed: boolean;
};

type Store = {
  sailings: Sailing[];
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
    globalStore.__northWharf = { sailings: seed() };
  }
  return globalStore.__northWharf;
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
