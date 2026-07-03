export function normalizeTags(tags: string[] | undefined): string[] {
  if (!tags || tags.length === 0) return [];

  const normalized = tags
    .map(tag => tag.toLowerCase().trim().replace(/\s+/g, '-'))
    .filter(tag => tag.length > 0);

  return [...new Set(normalized)];
}

export function mergeTags(existing: string[], incoming: string[]): string[] {
  return normalizeTags([...existing, ...incoming]);
}

export function tagsOverlap(tagsA: string[], tagsB: string[]): number {
  const setA = new Set(normalizeTags(tagsA));
  const setB = new Set(normalizeTags(tagsB));

  let overlap = 0;
  for (const tag of setA) {
    if (setB.has(tag)) overlap++;
  }

  const totalUnique = new Set([...setA, ...setB]).size;
  return totalUnique > 0 ? overlap / totalUnique : 0;
}
