import { notFound } from 'next/navigation';
import { rhysTemplate } from '../../features/site-templates/catalog/rhys/meta';
export function generateStaticParams() { return rhysTemplate.surfaces[0].pages.flatMap(page => [{ slug: page.slug ? page.slug.split('/') : [] }, { slug: ['en', ...(page.slug ? page.slug.split('/') : [])] }]); }
export default async function Page({ params }: {
    params: Promise<{
        slug?: string[];
    }>;
}) {
    const { slug = [] } = await params;
    const locale = slug[0] === 'en' ? 'en' : 'zh';
    const path = (locale === 'en' ? slug.slice(1) : slug).join('/');
    const page = rhysTemplate.surfaces[0].pages.find(p => p.slug === path);
    if (!page)
        notFound();
    const { default: Component } = await page.load();
    return <Component locale={locale} basePath={locale === 'en' ? '/en' : ''}/>;
}
export async function generateMetadata({ params }: {
    params: Promise<{
        slug?: string[];
    }>;
}) { const { slug = [] } = await params; const locale = slug[0] === 'en' ? 'en' : 'zh'; const pageSlug = (locale === 'en' ? slug.slice(1) : slug).join('/'); const page = rhysTemplate.surfaces[0].pages.find(p => p.slug === pageSlug); return { title: (locale === 'en' ? page?.localizedTitles?.en : page?.title) + ' · Rhys Studio', description: locale === 'zh' ? '产品设计师作品、随笔与创意探索' : 'Product design, notes, and creative exploration' }; }
