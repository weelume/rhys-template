import type { SiteTemplate,SiteTemplatePage,SiteTemplatePageProps } from '../../types';
import { createElement } from 'react';
import { works,notes } from './content/data';
import screenshotData from './screenshots.json';
const pages:SiteTemplatePage[]=[
  {slug:'',title:'首页',localizedTitles:{en:'Home'},load:()=>import('./pages/HomePage')},
  {slug:'work',title:'作品',localizedTitles:{en:'Work'},load:()=>import('./pages/WorkPage')},
  {slug:'about',title:'关于',localizedTitles:{en:'About'},load:()=>import('./pages/AboutPage')},
  {slug:'notes',title:'随笔',localizedTitles:{en:'Notes'},load:()=>import('./pages/NotesPage')},
  {slug:'exploration',title:'探索',localizedTitles:{en:'Exploration'},load:()=>import('./pages/ExplorationPage')},
  ...works.map(work=>({slug:'work/'+work.slug,title:work.title.zh,localizedTitles:{en:work.title.en},load:async()=>{const {default:Page}=await import('./pages/ProjectPage');return {default:(props:SiteTemplatePageProps)=>createElement(Page,{...props,slug:work.slug})};}})),
  ...notes.map(note=>({slug:'notes/'+note.slug,title:note.title.zh,localizedTitles:{en:note.title.en},load:async()=>{const {default:Page}=await import('./pages/ArticlePage');return {default:(props:SiteTemplatePageProps)=>createElement(Page,{...props,slug:note.slug})};}})),
  {slug:'privacy',title:'隐私政策',localizedTitles:{en:'Privacy'},load:()=>import('./pages/LegalPage')},
  {slug:'terms',title:'使用条款',localizedTitles:{en:'Terms'},load:async()=>{const {default:Page}=await import('./pages/LegalPage');return {default:(props:SiteTemplatePageProps)=>createElement(Page,{...props,terms:true})};}},
];
export const rhysTemplate:SiteTemplate={id:'rhys',name:'Rhys · 产品设计师作品集',localizedNames:{en:'Rhys · Product designer portfolio'},sceneId:'brand-portfolio',listed:false,tags:['作品集','创意设计','动态卡片','中英文','PC / iPad / H5'],summary:'暖白与彩色卡片的设计师作品集，包含八个项目、六篇随笔、十五个创意实验、可拖拽卡片与动态视频。',accentColor:'#ffab53',cover:'/templates/rhys/screenshots/desktop-home.webp',screenshots:screenshotData.map(s=>({...s,device:s.device as 'desktop'|'tablet'|'mobile'})) as SiteTemplate['screenshots'],surfaces:[{id:'site',name:'作品集',platform:'pc',locales:['zh','en'],pages}]};
