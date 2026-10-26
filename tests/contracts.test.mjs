import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {works,notes,experiments} from '../src/features/site-templates/catalog/rhys/content/data.ts';
import {chineseCases,chineseNotes} from '../src/features/site-templates/catalog/rhys/content/chinese.ts';
import {pathFor,languagePath} from '../src/features/site-templates/catalog/rhys/routing.ts';
const root=new URL('../',import.meta.url);
test('全站双语数据与本地动态素材完整',async()=>{
  assert.equal(works.length,8);assert.equal(notes.length,6);assert.equal(experiments.length,15);
  const source=JSON.parse(await readFile(new URL('src/features/site-templates/catalog/rhys/content/reference.json',root)));
  for(const work of works){assert.ok(chineseCases[work.slug]);assert.ok(source['work/'+work.slug]);await access(new URL('public/templates/rhys/media/'+work.cover,root));}
  for(const note of notes){assert.ok(chineseNotes[note.slug]);assert.ok(source['notes/'+note.slug]);await access(new URL('public/templates/rhys/media/'+note.cover,root));}
  for(const item of experiments)await access(new URL('public/templates/rhys/media/'+item.file,root));
  for(const article of Object.values(source))for(const block of article.body)if(block.tag==='img')await access(new URL('public'+block.src,root));
});
test('站内挂载、语言切换和查询锚点保持一致',()=>{
  assert.equal(pathFor('/demo/site','work/a'),'/demo/site/work/a');
  assert.equal(pathFor('','#Contact'),'/#Contact');
  assert.equal(languagePath('/demo/site','/demo/site/notes/a','zh','?ref=1','#read'),'/demo/site/en/notes/a?ref=1#read');
  assert.equal(languagePath('/demo/site/en','/demo/site/en/work','en','?x=1','#x'),'/demo/site/work?x=1#x');
  assert.equal(languagePath('/en','/en','en'),'/');
});
