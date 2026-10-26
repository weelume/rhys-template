import Link from 'next/link';
import type { SiteTemplatePageProps } from '../../../types';
import { Shell } from '../components/Shell';
import { pathFor } from '../routing';
import { Reveal } from '../components/Motion';
import { works, asset } from '../content/data';
import { chineseCases } from '../content/chinese';
import reference from '../content/reference.json';
interface Block { tag:string; text?:string; src?:string; alt?:string; }
interface Article { title:string; intro:string[]; body:Block[]; }
const articles:Record<string,Article>=reference;
export default function ProjectPage({locale='zh',basePath,slug}:SiteTemplatePageProps&{slug:string}) {
  const work=works.find(w=>w.slug===slug)!; const index=works.indexOf(work),next=works[(index+1)%works.length];
  const source=articles['work/'+slug], zh=locale==='zh', chinese=chineseCases[slug];
  const metadata=source.intro.slice(1,13);
  const labels=zh?['客户','职责','团队','时间','平台','方向']:['Client','Role','Team','Timeline','Platforms','Focus'];
  const localizedMeta=[work.name,zh?(work.category.zh+' · 主导设计与交付'):metadata[3],zh?'跨职能产品团队':metadata[5],metadata[7],metadata[9],zh?work.summary.zh:metadata[11]];
  const images=source.body.filter(b=>b.tag==='img');
  return <Shell {...{locale,basePath}}><div className="rhys-wrap rhys-page"><Reveal className="rhys-project-header"><div><h1>{work.title[locale]}</h1><p>{zh?chinese.intro:source.intro[0]}</p></div><dl className="rhys-project-meta">{labels.map((label,i)=><div key={label}><dt>{label}</dt><dd>{localizedMeta[i]}</dd></div>)}</dl></Reveal></div><article className="rhys-prose">
    {zh?<><img className="rhys-article-hero" src={images[0]?.src??asset(work.cover)} alt={work.title.zh}/><h2>设计挑战</h2>{chinese.challenge.map(p=><p key={p}>{p}</p>)}{images.slice(1,4).map((image,i)=><img key={image.src} src={image.src} alt={work.name+' 项目过程 '+(i+1)} loading="lazy"/>)}<h2>设计过程</h2>{chinese.process.map(p=><p key={p}>{p}</p>)}{images.slice(4,8).map((image,i)=><img key={image.src} src={image.src} alt={work.name+' 方案细节 '+(i+1)} loading="lazy"/>)}<h2>解决方案</h2>{chinese.solution.map(p=><p key={p}>{p}</p>)}<h2>项目结果</h2>{chinese.outcome.map(p=><p key={p}>{p}</p>)}<div className="rhys-metrics"><div><small>{chinese.metrics[0]}</small><strong>{chinese.metrics[1]}</strong></div><div><small>{chinese.metrics[2]}</small><strong>{chinese.metrics[3]}</strong></div></div><h2>“{chinese.quote}”</h2></>:source.body.map((block,i)=>block.tag==='img'?<img key={i} src={block.src} alt={block.alt} loading="lazy"/>:block.tag==='h2'?<h2 key={i}>{block.text}</h2>:block.tag==='h3'?<h3 key={i}>{block.text}</h3>:<p key={i}>{block.text}</p>)}
    <div className="rhys-article-nav"><Link href={pathFor(basePath,'work')}>{zh?'返回全部作品':'Back to All Works'}</Link><Link href={pathFor(basePath,'work/'+next.slug)}>{next.title[locale]}</Link></div></article></Shell>;
}
