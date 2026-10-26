'use client';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { TemplateLocale } from '../../../types';
import { asset, works, notes, experiments, faq } from '../content/data';
import { Reveal, Media } from './Motion';
import { pathFor } from '../routing';

export function WorkGrid({locale,basePath,limit}:{locale:TemplateLocale;basePath:string;limit?:number}) {
  const [count,setCount]=useState(limit??6);
  return <><div className="rhys-work-grid">{works.slice(0,count).map((work,i)=><Reveal key={work.slug} delay={(i%2)*.1} tilt><Link href={pathFor(basePath,'work/'+work.slug)} className="rhys-work-card"><div className="rhys-work-image"><Media file={work.cover} label={work.summary[locale]}/></div><div className="rhys-work-caption"><span className="rhys-tag">{work.category[locale]}</span><h3>{work.name}</h3><p>{work.summary[locale]}</p></div></Link></Reveal>)}</div>{!limit&&count<works.length&&<button className="rhys-button rhys-center-button" onClick={()=>setCount(works.length)}>{locale==='zh'?'加载更多':'Load more'}</button>}</>;
}
export function NoteGrid({locale,basePath,carousel=false}:{locale:TemplateLocale;basePath:string;carousel?:boolean}) {
  const ref=useRef<HTMLDivElement>(null),[index,setIndex]=useState(0);
  const data=carousel?notes.slice(0,4):[notes[1],notes[4],notes[2],notes[3],notes[5],notes[0]];
  const scroll=(step:number)=>{const element=ref.current;if(!element)return;const width=element.firstElementChild?.getBoundingClientRect().width??element.clientWidth;const next=Math.max(0,Math.min(data.length-1,index+step));element.scrollTo({left:next*(width+24),behavior:'smooth'});setIndex(next);};
  return <div className={carousel?'rhys-notes-carousel':'rhys-notes-grid'}><div ref={ref} className={carousel?'rhys-notes-track':'rhys-note-items'} onScroll={()=>{const e=ref.current;if(e){const w=e.firstElementChild?.getBoundingClientRect().width??1;setIndex(Math.round(e.scrollLeft/(w+24)));}}}>{data.map(note=><Reveal key={note.slug}><Link className="rhys-note-card" href={pathFor(basePath,'notes/'+note.slug)}><div className="rhys-note-image"><img src={asset(note.cover)} alt={note.title[locale]} loading="lazy"/></div><span className="rhys-tag">{note.category[locale]}</span><h3>{note.title[locale]}</h3><p>{locale==='zh'?'阅读文章':'Read Note'}</p></Link></Reveal>)}</div>{carousel&&<div className="rhys-carousel-controls"><button aria-label={locale==='zh'?'上一篇':'Previous'} onClick={()=>scroll(-1)} disabled={index===0}>‹</button><button aria-label={locale==='zh'?'下一篇':'Next'} onClick={()=>scroll(1)} disabled={index>=data.length-1}>›</button></div>}</div>;
}
export function PhotoCarousel({locale}:{locale:TemplateLocale}) {
  const files=['xlO5rH1if5NTrUI56DFq5q6bBZw.jpg','YmBq5zvR7RE8uZ5duzHcQakJAE.gif','7PNEC8hh4rZ9JcITEIPSBOUw.png'];
  const [index,setIndex]=useState(0),[pause,setPause]=useState(false),reduced=useReducedMotion();
  useEffect(()=>{if(pause||reduced||files.length<2)return;const timer=setInterval(()=>setIndex(i=>(i+1)%files.length),4000);return()=>clearInterval(timer);},[pause,reduced,files.length]);
  return <div className="rhys-photo-carousel" onMouseEnter={()=>setPause(true)} onMouseLeave={()=>setPause(false)} onFocusCapture={()=>setPause(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPause(false);}}><AnimatePresence mode="popLayout"><motion.img key={index} src={asset(files[index])} alt={locale==='zh'?'生活与创作片段 '+(index+1):'Life and creative work '+(index+1)} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{type:'spring',stiffness:200,damping:40}} drag="x" dragConstraints={{left:0,right:0}} onDragEnd={(_,info)=>{if(Math.abs(info.offset.x)>45)setIndex((index+(info.offset.x<0?1:files.length-1))%files.length);}}/></AnimatePresence><div className="rhys-dots">{files.map((f,i)=><button key={f} aria-label={locale==='zh'?'切换到第'+(i+1)+'张':'Scroll to page '+(i+1)} aria-pressed={i===index} onClick={()=>setIndex(i)}/>)}<button className="rhys-pause" onClick={()=>setPause(!pause)} aria-label={locale==='zh'?(pause?'播放轮播':'暂停轮播'):(pause?'Play slideshow':'Pause slideshow')}>{pause?'▷':'Ⅱ'}</button></div></div>;
}
export function ExplorationGrid({locale,loop=false}:{locale:TemplateLocale;loop?:boolean}) {
  const selection=loop?[experiments[1],experiments[3],experiments[11],experiments[5],experiments[8],experiments[10]]:experiments;
  const cards=(clone=false)=>selection.map((item,i)=><motion.div key={item.file+(clone?'-clone':'')} className={'rhys-experiment exp-'+i%5} initial={loop?false:{opacity:0,y:80,rotateX:20}} whileInView={{opacity:1,y:0,rotateX:0}} viewport={{once:true}} transition={{type:'spring',duration:1,bounce:.2,delay:(i%3)*.08}} whileHover={{scale:1.06,rotate:0}}><Media file={item.file} label={item.title[locale]} controls={!loop}/><p>{item.title[locale]}</p><small>{item.category[locale]}</small></motion.div>);
  return loop?<div className="rhys-marquee rhys-experiment-marquee" tabIndex={0} aria-label={locale==='zh'?'循环创意画廊，悬停或聚焦暂停':'Looping creative gallery; hover or focus to pause'}><div className="rhys-marquee-track"><div>{cards()}</div><div aria-hidden inert>{cards(true)}</div></div></div>:<div className="rhys-experiments-grid">{cards()}</div>;
}
export function FAQ({locale}:{locale:TemplateLocale}) {
  const [open,setOpen]=useState<number|null>(null),reduced=useReducedMotion();
  return <div className="rhys-faq">{faq.map(([q,a],i)=><div key={i}><h3><button aria-expanded={open===i} aria-controls={'rhys-answer-'+i} onClick={()=>setOpen(open===i?null:i)}>{q[locale]}<motion.span animate={{rotate:open===i?45:0}}>+</motion.span></button></h3><AnimatePresence>{open===i&&<motion.div id={'rhys-answer-'+i} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{type:'spring',duration:reduced?0:.4,bounce:0}}><p>{a[locale]}</p></motion.div>}</AnimatePresence></div>)}</div>;
}
