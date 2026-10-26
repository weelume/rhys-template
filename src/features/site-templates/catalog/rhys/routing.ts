export const pathFor=(base:string,path:string):string=>path.startsWith('#')?(base||'/')+path:(base+'/'+path).replace(/\/$/,'')||'/';
export function languagePath(base:string,pathname:string,locale:'zh'|'en',search='',hash=''):string {
  return ((locale==='zh'?base.replace(/\/en$/,'')+'/en':base.replace(/\/en$/,''))+pathname.slice(base.length)||'/')+search+hash;
}
