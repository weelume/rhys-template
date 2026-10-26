import type { SiteTemplatePageProps } from '../../../types';
import { Shell } from '../components/Shell';
import { Reveal } from '../components/Motion';
import { ExplorationGrid } from '../components/Cards';
export default function ExplorationPage({locale='zh',basePath}:SiteTemplatePageProps){return <Shell {...{locale,basePath}}><div className="rhys-wrap rhys-page"><Reveal className="rhys-exploration-heading"><h1 className="rhys-page-title">{locale==='zh'?'探索':'Exploration'}</h1><p>{locale==='zh'?'未完成的灵感 原始的思考\n没有评审者的岔路、草稿和直觉实验\n记录过程 让想法自由生长':'Less finished work than raw thinking. Detours, drafts, and hunches tested without a stakeholder; the process, not the pitch.'}</p></Reveal><ExplorationGrid locale={locale}/></div></Shell>;}
