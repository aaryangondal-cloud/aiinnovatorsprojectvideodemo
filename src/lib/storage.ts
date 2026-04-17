export interface SavedDescription {
  id: string;
  stoneType: string;
  caratWeight: string;
  metalType: string;
  jewelryType: string;
  price: string;
  headline: string;
  fullOutput: string;
  createdAt: string;
}

function getKey(email: string) {
  return `gemcopy_descriptions_${email}`;
}

export function saveDescription(
  email: string,
  data: Omit<SavedDescription, "id" | "createdAt">
): SavedDescription {
  const all = getDescriptions(email);
  const item: SavedDescription = {
    ...data,
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  all.unshift(item);
  localStorage.setItem(getKey(email), JSON.stringify(all));
  return item;
}

export function getDescriptions(email: string): SavedDescription[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(getKey(email)) || "[]");
  } catch {
    return [];
  }
}

export function deleteDescription(email: string, id: string): void {
  const all = getDescriptions(email).filter((d) => d.id !== id);
  localStorage.setItem(getKey(email), JSON.stringify(all));
}
