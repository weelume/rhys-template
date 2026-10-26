import type { SiteTemplatePageProps } from '../../../types';
import { Shell } from '../components/Shell';
import { Reveal } from '../components/Motion';
import { WorkGrid } from '../components/Cards';
export default function WorkPage({locale='zh',basePath}:SiteTemplatePageProps){return <Shell {...{locale,basePath}}><div className="rhys-wrap rhys-page"><Reveal><h1 className="rhys-page-title">{locale==='zh'?'作品':'Work'}</h1></Reveal><WorkGrid {...{locale,basePath}}/></div></Shell>;}
