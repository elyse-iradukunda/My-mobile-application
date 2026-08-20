export const CATEGORIES = [
  'Construction',
  'Agriculture',
  'Photography',
  'Events',
  'Music',
  'Electronics',
  'Transportation',
  'House Services',
] as const;

export type Category = (typeof CATEGORIES)[number];
