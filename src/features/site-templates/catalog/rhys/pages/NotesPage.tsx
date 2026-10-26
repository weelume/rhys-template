import type { SiteTemplatePageProps } from '../../../types';
import { Shell } from '../components/Shell';
import { Reveal } from '../components/Motion';
import { NoteGrid } from '../components/Cards';
export default function NotesPage({locale='zh',basePath}:SiteTemplatePageProps){return <Shell {...{locale,basePath}}><div className="rhys-wrap rhys-page"><Reveal><h1 className="rhys-page-title">{locale==='zh'?'随笔':'Notes'}</h1></Reveal><NoteGrid {...{locale,basePath}}/></div></Shell>;}
