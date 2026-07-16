import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site';

export async function GET(context) {
  const essays = (await getCollection('writing')).filter((essay) => !essay.data.draft).sort((a,b)=>b.data.date-a.data.date);
  return rss({
    title: `${site.name} — Writing`,
    description: 'Essays by David Berube.',
    site: context.site,
    items: essays.map((essay) => ({
      title: essay.data.title,
      description: essay.data.summary,
      pubDate: essay.data.date,
      link: `/writing/${essay.id}/`
    }))
  });
}
