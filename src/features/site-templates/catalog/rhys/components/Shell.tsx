'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { SiteTemplatePageProps } from '../../../types';
import { useRhysHost } from '../host';
import { brand } from '../config/brand';
import { nav } from '../content/data';
import { Reveal } from './Motion';
import { PeelSticker } from './PeelSticker';
import { pathFor,languagePath } from '../routing';
import '../theme.css';

export function Shell({children,locale='zh',basePath}:{children:ReactNode}&SiteTemplatePageProps) {
  const host=useRhysHost(), name=(host.brandName??brand.name)[locale], pathname=usePathname();
  const [open,setOpen]=useState(false),[notice,setNotice]=useState('');
  const router=useRouter();
  const languageHref=languagePath(basePath,pathname,locale);
  const menuRef=useRef<HTMLDivElement>(null),toggleRef=useRef<HTMLButtonElement>(null),reduced=useReducedMotion();
  useEffect(()=>{const root=document.documentElement;root.dataset.rhysScroll='true';return()=>{delete root.dataset.rhysScroll;};},[]);
  useEffect(()=>{
    if(!open)return;
    const before=document.body.style.overflow;document.body.style.overflow='hidden';
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const key=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){setOpen(false);toggleRef.current?.focus();}
      if(event.key==='Tab'){
        const items=[toggleRef.current,...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a')??[])].filter((x):x is HTMLButtonElement|HTMLAnchorElement=>x!==null);
        const first=items[0],last=items.at(-1);
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    document.addEventListener('keydown',key);return()=>{document.body.style.overflow=before;document.removeEventListener('keydown',key);};
  },[open]);
  return <div data-template="rhys" lang={locale==='zh'?'zh-CN':'en'}>
    <a className="rhys-skip" href="#rhys-main">{locale==='zh'?'跳转正文':'Skip to content'}</a>
    <header className="rhys-nav"><div className="rhys-nav-top"><Link href={basePath||'/'} className="rhys-brand">{host.lightLogo&&<img src={host.lightLogo} alt=""/>}{name}</Link><div className="rhys-nav-actions"><Link href={languageHref} onClick={event=>{if(event.button===0&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey){event.preventDefault();router.push(languageHref+window.location.search+window.location.hash);}}} aria-label={locale==='zh'?'切换到英文':'Switch to Chinese'}>{locale==='zh'?'EN':'中'}</Link><button ref={toggleRef} aria-expanded={open} aria-controls="rhys-menu" aria-label={locale==='zh'?(open?'关闭菜单':'打开菜单'):(open?'Close menu':'Open menu')} onClick={()=>setOpen(!open)}><span className={open?'rhys-grid-icon is-open':'rhys-grid-icon'}>{Array.from({length:9},(_,i)=><i key={i}/>)}</span></button></div></div>
    <AnimatePresence>{open&&<motion.div id="rhys-menu" ref={menuRef} className="rhys-menu" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{type:'spring',duration:reduced?0:.4,bounce:0}}><nav aria-label={locale==='zh'?'主导航':'Main navigation'}>{nav.map(([path,zh,en],i)=><motion.div key={path} initial={reduced?false:{y:16,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:i*.04}}><Link onClick={()=>{setOpen(false);}} href={pathFor(basePath,path)}>{locale==='zh'?zh:en}</Link></motion.div>)}</nav></motion.div>}</AnimatePresence></header>
    {open&&<button className="rhys-menu-backdrop" aria-label={locale==='zh'?'关闭菜单背景':'Close menu backdrop'} onClick={()=>setOpen(false)}/>}
    <main id="rhys-main" key={pathname}>{children}</main>
    <section className="rhys-contact rhys-wrap" id="Contact"><Reveal><div className="rhys-rainbow" aria-hidden>♧</div><h2>{locale==='zh'?'一起聊聊':'Let’s connect'}</h2><p>{locale==='zh'?'如果这些作品与你的想法相合\n我很期待听听你的计划':'If the work above is the kind of thing you’re looking for,\nI’d like to hear about it.'}</p><div className="rhys-contact-links"><a href={'mailto:'+brand.email}>{locale==='zh'?'电子邮件':'Email'}<span aria-hidden>✉</span></a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn<span aria-hidden>in</span></a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram<span aria-hidden>◎</span></a><button onClick={()=>setNotice(locale==='zh'?'演示简历下载，尚未配置文件':'Demo resume download; no file has been configured.')}>{locale==='zh'?'下载简历':'Download Resume'}<span aria-hidden>♧</span></button><button onClick={()=>setNotice(locale==='zh'?'模板下载为演示入口':'Template download is a demo action.')}>{locale==='zh'?'下载此模板':'Download this template'}</button></div><p role="status" className="rhys-notice">{notice}</p></Reveal></section>
    <footer className="rhys-footer"><div className="rhys-peel"><PeelSticker locale={locale}/></div><p>{name} · {brand.year}</p><small>{locale==='zh'?'保留所有权利':'All rights reserved.'}</small><div className="rhys-legal"><Link href={pathFor(basePath,'privacy')}>{locale==='zh'?'隐私政策':'Privacy'}</Link><Link href={pathFor(basePath,'terms')}>{locale==='zh'?'使用条款':'Terms'}</Link></div>{host.marketplaceHref&&<Link href={host.marketplaceHref}>{host.marketplaceLabel?.[locale]}</Link>}{host.filing}</footer>
    {host.marketplaceHref&&<Link href={host.marketplaceHref} className="rhys-market" aria-label={host.marketplaceAriaLabel?.[locale]}>{host.lightLogo&&<img src={host.lightLogo} alt=""/>}<span>{name}</span></Link>}
  </div>;
}
