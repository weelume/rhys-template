'use client';
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { asset, type Bilingual } from '../content/data';
import type { TemplateLocale } from '../../../types';

export function Reveal({ children, delay=0, className='', tilt=false }: {children:ReactNode;delay?:number;className?:string;tilt?:boolean}) {
  const reduced=useReducedMotion();
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:80,rotateX:tilt?20:0}} whileInView={{opacity:1,y:0,rotateX:0}} viewport={{once:true,amount:.08}} transition={{type:'spring',duration:tilt?1:.8,bounce:tilt?.2:0,delay}}>{children}</motion.div>;
}
export function SplitTitle({children,className=''}:{children:string;className?:string}) {
  const reduced=useReducedMotion();
  return <h2 className={className} aria-label={children}>{children.split(' ').map((word,i)=><motion.span aria-hidden key={i} style={{display:'inline-block',marginInlineEnd:'.22em'}} initial={reduced?false:{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{type:'spring',duration:.8,bounce:0,delay:i*.05}}>{word}</motion.span>)}</h2>;
}
export function Media({file,label,className='',controls=false}:{file:string;label:string;className?:string;controls?:boolean}) {
  const ref=useRef<HTMLVideoElement>(null), visible=useInView(ref,{margin:'100px'}), reduced=useReducedMotion();
  const [error,setError]=useState(false);
  useEffect(()=>{const video=ref.current;if(!video)return;if(visible&&!reduced){video.play().catch((reason:unknown)=>{console.debug('[rhys:video] autoplay requires user interaction',{file,reason:reason instanceof Error?reason.name:'unknown'});});}else video.pause();},[visible,reduced,file]);
  if(!file.endsWith('.mp4'))return <img className={className} src={asset(file)} alt={label} loading="lazy"/>;
  return <div className={'rhys-video '+className}><video ref={ref} src={asset(file)} muted loop playsInline preload="metadata" aria-label={label} controls={controls||!!reduced||error} onError={()=>{console.error('[rhys:video] media failed',{file});setError(true);}}/>{error&&<p role="alert">视频加载失败 / Video unavailable</p>}</div>;
}
export function Badge({locale,signature=false}:{locale:TemplateLocale;signature?:boolean}) {
  const reduced=useReducedMotion();
  return <motion.div className={'rhys-badge'+(signature?' rhys-badge-footer':'')} drag={!reduced} dragConstraints={{top:0,left:0,right:0,bottom:0}} dragElastic={.45} dragTransition={{bounceStiffness:260,bounceDamping:26}} aria-label={locale==='zh'?'高级产品设计师旋转徽章':'Senior product designer rotating badge'}><motion.svg viewBox="0 0 200 200" animate={reduced?undefined:{rotate:360}} transition={{duration:12,repeat:Infinity,ease:'linear'}} aria-hidden><defs><path id={signature?'rhys-circle-footer':'rhys-circle-hero'} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text><textPath href={'#'+(signature?'rhys-circle-footer':'rhys-circle-hero')}>{locale==='zh'?'高级产品设计师 · 研究与视觉设计 · 用细节连接想法 · ':'SENIOR PRODUCT DESIGNER · BASED IN SAN FRANCISCO · PRODUCT DESIGN · '}</textPath></text></motion.svg><span>{signature?'Rhys':'✳'}</span></motion.div>;
}
function FanCard({file,title,category,index,progress,locale}:{file:string;title:Bilingual;category:Bilingual;index:number;progress:MotionValue<number>;locale:TemplateLocale}) {
  const rotations=[-14,-7,0,7,14];
  const x=useTransform(progress,[0,1],[(index-2)*7,(index-2)*30]);
  const rotate=useTransform(progress,[0,1],[rotations[index],rotations[index]*1.35]);
  const reduced=useReducedMotion();
  return <div className={'rhys-fan-slot fan-'+index}><motion.div className='rhys-fan-card' style={reduced?undefined:{x,rotate}} initial={reduced?false:{y:180,opacity:0}} animate={{y:0,opacity:1}} transition={{type:'spring',duration:1.2,bounce:0,delay:.1*Math.abs(index-2)}} drag={!reduced} dragConstraints={{top:0,left:0,right:0,bottom:0}} dragElastic={.25} dragTransition={{bounceStiffness:400,bounceDamping:30}} whileHover={{y:-20,scale:1.04}}><Media file={file} label={title[locale]}/><p>{title[locale]}</p><small>{category[locale]}</small></motion.div></div>;
}
export function HeroFan({locale}:{locale:TemplateLocale}) {
  const ref=useRef<HTMLDivElement>(null); const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const cards=[['tSBfItHTMFDFhMixEPJ4uICmQ.mp4','数字倒计时','Count Down','动态设计','Motion'],['8FQiTKtBinu74nc3g2hsl0mEBYQ.mp4','色彩地图','Splatter Map','生成艺术','Generative'],['Qop1QYv0vVGNftv6b9FnvgqNono.png','很高兴见到你 :)','Nice to see you :)','你好','Hello'],['DcyJ9KM4zqDAAM2W3Is9SluhIlc.jpg','运动之中','In Motion','视觉','Visual'],['Qko9BYRMYLzsnd02dZQ4cN6sI.png','抖动纹理','Dither Texture','生成艺术','Generative']];
  return <div className="rhys-fan" ref={ref}>{cards.map(([file,zh,en,cz,ce],index)=><FanCard key={file} {...{file,index,progress:scrollYProgress,locale}} title={{zh,en}} category={{zh:cz,en:ce}}/>)}</div>;
}
