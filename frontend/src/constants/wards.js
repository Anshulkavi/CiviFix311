/**
 * Indore Ward List (1-85)
 * Indore Municipal Corporation has 85 wards
 */
export const INDORE_WARDS = Array.from({ length: 85 }, (_, i) => ({
  value: String(i + 1),
  label: `Ward ${i + 1}`,
}));
