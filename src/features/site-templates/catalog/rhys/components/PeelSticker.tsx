'use client';
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, type PanInfo } from 'framer-motion';
import { useState } from 'react';
import type { TemplateLocale } from '../../../types';
type Point={x:number;y:number};
/** 折线两侧分别裁切与镜像，模拟圆形贴纸掀起；不以整张平移替代翻折。 */
function halfPlane(points:Point[],normal:Point,mid:Point,keepFront:boolean):Point[]{
  const result:Point[]=[];const distance=(p:Point)=>(p.x-mid.x)*normal.x+(p.y-mid.y)*normal.y;
  for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length],da=distance(a),db=distance(b),inside=keepFront?da<=0:da>=0,next=keepFront?db<=0:db>=0;if(inside)result.push(a);if(inside!==next){const t=da/(da-db);result.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});}}
  return result;
}
export function PeelSticker({locale}:{locale:TemplateLocale}){
  const reduced=useReducedMotion(),amount=useMotionValue(0),[peel,setPeel]=useState(0),[peeled,setPeeled]=useState(false),[angle,setAngle]=useState(123*Math.PI/180);
  useMotionValueEvent(amount,'change',setPeel);
  const n={x:Math.cos(angle),y:Math.sin(angle)},size=208,r=size/2,grip={x:r+n.x*r,y:r+n.y*r};
  const mid={x:grip.x-n.x*peel/2,y:grip.y-n.y*peel/2};
  const square=[{x:0,y:0},{x:size,y:0},{x:size,y:size},{x:0,y:size}];
  const polygon=(points:Point[])=>'polygon('+points.map(p=>`${p.x}px ${p.y}px`).join(',')+')';
  const front=polygon(halfPlane(square,n,mid,true)),back=polygon(halfPlane(square,n,mid,false));
  const k=2*(mid.x*n.x+mid.y*n.y);
  const matrix=`matrix(${1-2*n.x*n.x},${-2*n.x*n.y},${-2*n.x*n.y},${1-2*n.y*n.y},${k*n.x},${k*n.y})`;
  // 初态不输出浮点裁切；浏览器会压缩 CSS 数字精度，直接 SSR 会造成属性水合不一致。
  const frontStyle=peel>0?{clipPath:front}:undefined;
  const backStyle=peel>0?{transform:matrix}:{display:'none'};
  const start=(_:PointerEvent|MouseEvent|TouchEvent,info:PanInfo)=>{const el=document.querySelector('.rhys-peel-sticker');if(!el)return;const rect=el.getBoundingClientRect();setAngle(Math.atan2(info.point.y-(rect.top+scrollY+r),info.point.x-(rect.left+scrollX+r)));};
  const release=()=>{if(amount.get()>=size){animate(amount,size*3,{duration:reduced?0:.2,onComplete:()=>setPeeled(true)});}else animate(amount,0,{type:'spring',stiffness:710,damping:53});};
  return <div className="rhys-peel-sticker"><div className="rhys-peel-under"><strong>{locale==='zh'?'好奇心\n层层展开':'Curiosity,\nunpeeled.'}</strong><span>{locale==='zh'?'聊一聊 :)':'Let’s talk : )'}</span></div>{!peeled&&<motion.div className="rhys-peel-interaction" onPanStart={start} onPan={(_,info)=>amount.set(Math.max(0,-info.offset.x*n.x-info.offset.y*n.y))} onPanEnd={release} onHoverStart={()=>{if(!reduced)animate(amount,size*.3,{type:'spring',stiffness:710,damping:53});}} onHoverEnd={()=>{if(amount.get()<size)animate(amount,0,{type:'spring',stiffness:710,damping:53});}}><div className="rhys-peel-face" style={frontStyle}><svg viewBox="0 0 208 208" aria-hidden><defs><path id="rhys-peel-ring" d="M104,104 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/></defs><text><textPath href="#rhys-peel-ring">{locale==='zh'?'高级产品设计师 · 研究与视觉设计 · 用细节连接想法 · ':'SENIOR PRODUCT DESIGNER · BASED IN SAN FRANCISCO · PRODUCT DESIGN · '}</textPath></text></svg><span>Rhys</span></div><div className="rhys-peel-back-wrap" style={backStyle}><div className="rhys-peel-back" style={peel>0?{clipPath:back}:undefined}/></div></motion.div>}<button className="rhys-peel-keyboard" onClick={()=>{if(peeled){setPeeled(false);amount.set(0);}else{animate(amount,size*3,{duration:reduced?0:.4,onComplete:()=>setPeeled(true)});}}}>{locale==='zh'?(peeled?'恢复贴纸':'揭开贴纸'):(peeled?'Restore sticker':'Peel sticker')}</button></div>;
}
