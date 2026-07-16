import { getCollection } from 'astro:content';

export const live = (entry: { data: { draft?: boolean } }) => !entry.data.draft;
export const itemDate = (entry: { data: { date?: Date; updated?: Date } }) => entry.data.updated ?? entry.data.date ?? new Date(0);
export const byFreshnessDesc = (a: { data: { date?: Date; updated?: Date } }, b: { data: { date?: Date; updated?: Date } }) => itemDate(b).valueOf() - itemDate(a).valueOf();
export const byDateDesc = (a: { data: { date: Date } }, b: { data: { date: Date } }) => b.data.date.valueOf() - a.data.date.valueOf();
export const number = (index: number) => String(index + 1).padStart(3, '0');
export const shortDate = (date: Date) => date.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
export async function getLiveCollection(name: 'writing' | 'builds' | 'agents' | 'now') {
  return (await getCollection(name)).filter(live).sort(byFreshnessDesc);
}
export const ogFor = (slug: string) => `/og/${slug.replaceAll('/', '-')}.png`;
export const projectTitle = (entry: { data: { name: string } }) => entry.data.name;
export const stackLine = (stack: string[]) => stack.join(' · ');
export const hasBody = (entry: { body?: string }) => Boolean(entry.body?.trim());
