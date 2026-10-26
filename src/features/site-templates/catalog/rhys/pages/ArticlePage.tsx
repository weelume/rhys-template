import Link from 'next/link';
import type { SiteTemplatePageProps } from '../../../types';
import { Shell } from '../components/Shell';
import { pathFor } from '../routing';
import { notes,asset } from '../content/data';
import { chineseNotes } from '../content/chinese';
import reference from '../content/reference.json';
interface Block { tag:string; text?:string; src?:string; alt?:string; }
const articles:Record<string,{intro:string[];body:Block[]}>=reference;
export default function ArticlePage({locale='zh',basePath,slug}:SiteTemplatePageProps&{slug:string}) {
  const note=notes.find(n=>n.slug===slug)!;const zh=locale==='zh',chinese=chineseNotes[slug],source=articles['notes/'+slug],index=notes.indexOf(note),next=notes[(index+1)%notes.length];
  return <Shell {...{locale,basePath}}><article className="rhys-prose rhys-page"><span className="rhys-tag">{note.category[locale]}</span><h1>{note.title[locale]}</h1><p>{zh?chinese.intro:source.intro[1]}</p><p className="rhys-date">{note.date[locale]}</p><img className="rhys-article-hero" src={asset(note.cover)} alt={note.title[locale]}/>{zh?<>{chinese.sections.map(([title,paragraphs])=><section key={title}><h2>{title}</h2>{paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}<p>Rhys 奥沙利文是 Fieldstone 的产品设计师，曾任职于 Loop。本文属于关于用户研究、设计系统与创作过程的不定期随笔。</p></>:source.body.map((block,i)=>block.tag==='img'?<img key={i} src={block.src} alt={block.alt} loading="lazy"/>:block.tag==='h2'||block.tag==='h3'?<h2 key={i}>{block.text}</h2>:<p key={i}>{block.text}</p>)}<div className="rhys-article-nav"><Link href={pathFor(basePath,'notes')}>{zh?'返回全部随笔':'Back to All Notes'}</Link><Link href={pathFor(basePath,'notes/'+next.slug)}>{next.title[locale]}</Link></div></article></Shell>;
}
