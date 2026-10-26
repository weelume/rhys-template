import type { TemplateLocale } from '../../../types';
export type Bilingual = { zh: string; en: string };
export const bi = (zh: string, en: string): Bilingual => ({ zh, en });
export const asset = (file: string) => '/templates/rhys/media/' + file;
export const nav = [ ['','首页','Home'], ['work','作品','Work'], ['exploration','探索','Exploration'], ['notes','随笔','Notes'], ['about','关于','About'], ['#Contact','联系','Contact'] ] as const;
export interface Work { slug: string; name: string; title: Bilingual; category: Bilingual; summary: Bilingual; cover: string; }
export const works: Work[] = [
  {slug:'waypoint-group-trip-planner',name:'Waypoint',title:bi('Waypoint · 团体旅行规划','Waypoint — Group Trip Planner'),category:bi('产品设计','Product Design'),summary:bi('将六个人的想法变成一份行程','Turning six opinions into one itinerary'),cover:'08XKpio4gojCzqIz3sNZBCS44.png'},
  {slug:'solstice-brand-identity-rooftop-solar',name:'Solstice',title:bi('Solstice · 屋顶太阳能品牌','Solstice — Brand Identity for Rooftop Solar'),category:bi('视觉设计','Visual Design'),summary:bi('让太阳能报价成为可信的计划','Making a solar quote feel like a plan, not a pitch'),cover:'EjAFvKT8ySEjGChz1xbjNnEH4.jpg'},
  {slug:'ledger-expense-approvals',name:'Ledger',title:bi('Ledger · 费用审批','Ledger — Expense Approvals'),category:bi('界面与体验','UI & UX'),summary:bi('从一摞票据到一眼明确的决策','Turning a queue of receipts into a decision in one glance'),cover:'hhJ9JQvEIZLWPeZXVlwwv2Z4j0.gif'},
  {slug:'northbound-research-repository',name:'Northbound',title:bi('Northbound · 研究资料库','Northbound — Research Repository'),category:bi('用户研究','Research'),summary:bi('让十八个月的研究成为可用的洞察','Turning eighteen months of research into insight'),cover:'HkuyUX1hhrVcpfmlAn3kVWSYFls.png'},
  {slug:'harbor-onboarding-freight-marketplace',name:'Harbor',title:bi('Harbor · 货运市场入驻','Harbor — Onboarding for a Freight Marketplace'),category:bi('界面与体验','UI & UX'),summary:bi('从注册到首单运输 无需电话协助','Getting a new carrier from sign-up to their first load without a phone call'),cover:'8hDs3faVw7gzyu1FKCu02NahBQ.png'},
  {slug:'marrow-packaging-identity-fermentation-kit',name:'Marrow',title:bi('Marrow · 发酵套装包装','Marrow — Packaging Identity for a Fermentation Kit'),category:bi('视觉设计','Visual Design'),summary:bi('让货架上的发酵产品更亲近','Making fermentation look approachable on a shelf full of jars'),cover:'OoemmGnLYp2LlYEKKryT1odcbU.png'},
  {slug:'compass-usability-testing-ops',name:'Compass',title:bi('Compass · 可用性测试运营','Compass — Usability Testing Ops'),category:bi('用户研究','Research'),summary:bi('缩短从研究问题到实际测试的等待','Cutting the wait between a research question and an actual session'),cover:'rJbA3H2qc1SusDNkpmy1Dc8WuQk.jpg'},
  {slug:'fieldstone-eval-workspace',name:'Fieldstone',title:bi('Fieldstone · 协作评估空间','Fieldstone — Eval Workspace'),category:bi('产品设计','Product Design'),summary:bi('让收藏的住所成为共同的决定','Turning saved stays into shared decisions'),cover:'7PNEC8hh4rZ9JcITEIPSBOUw.png'},
];
export const notes = [
  {slug:'the-best-tool-i-turned-off',title:bi('今年最好用的工具 是我关掉的那一个','The best tool I used this year was the one I turned off'),category:bi('设计','Design'),cover:'gCJKDmmW8000XIhjGxBvUvg1KQ.png',date:bi('2026年9月','Sep 2026')},
  {slug:'i-stopped-asking-the-model-to-be-creative',title:bi('不再要求模型发挥创意 它反而更有用了','I stopped asking the model to be creative, and it got more useful'),category:bi('人工智能','AI'),cover:'q4qKOWDuSmPUgdjtO2b99VXdg.png',date:bi('2026年8月','Aug 2026')},
  {slug:'the-roadmap-review-we-replaced',title:bi('我们用五分钟站会 代替路线图评审','The roadmap review we replaced with a five-minute standup'),category:bi('工作流程','Process'),cover:'2AKJ10LlBqy1S9FbB8vrgAoyv0.png',date:bi('2026年8月','Aug 2026')},
  {slug:'a-component-isnt-reusable-until-broken',title:bi('被别人用坏之前 组件还谈不上可复用','A component isn’t reusable until someone else has broken it'),category:bi('设计','Design'),cover:'M0rooBeJChcU8NjKMn9fPNxNLs.png',date:bi('2026年8月','Aug 2026')},
  {slug:'most-research-fails-in-the-readout',title:bi('研究往往不败在访谈 而败在汇报','Most research doesn’t fail in the interview. It fails in the readout.'),category:bi('设计','Design'),cover:'F6FgttchGjmXdKVkpndNkCamoI.png',date:bi('2026年8月','Aug 2026')},
  {slug:'the-last-ten-percent-is-a-different-skill',title:bi('最后百分之十 需要另一种能力','The last ten percent is a different skill than the first ninety'),category:bi('打磨','Craft'),cover:'2kGKLVuyYualbqnV0Ldw1zQeSI.png',date:bi('2026年8月','Aug 2026')},
];
export const experiments = [
  ['8FQiTKtBinu74nc3g2hsl0mEBYQ.mp4','色彩地图','Splatter Map','生成艺术','Generative'],
  ['uKDJ9GBdkMALmEtQkrvzdXZx2Y.mp4','身体语言','Body Work','动态设计','Motion'],
  ['DQIhDYa5VUHjqMQzC2uTfEyqx4.png','几何习作','Geometric Study','插画','Illustration'],
  ['BWnDk4DhimqUbGj6RcAMOsLZU.mp4','折线地平线','Chevron Horizon','生成艺术','Generative'],
  ['Qko9BYRMYLzsnd02dZQ4cN6sI.png','抖动纹理','Dither Texture','生成艺术','Generative'],
  ['QZ9ZZ4QGwbjT2AMmih8rvjqQ.png','倒数','Count Down','创意编程','Code'],
  ['KCZrKeEtCEr5wmyEoIbilpZFYA.mp4','本质与运动','Essence & Motion','动态设计','Motion'],
  ['DcyJ9KM4zqDAAM2W3Is9SluhIlc.jpg','运动之中','In Motion','视觉','Visual'],
  ['Jlmy9GssymSXpimzy3lhEtHpHQ.jpg','山坡村落','Hillside Village','插画','Illustration'],
  ['biQp0RZ8pyx4wTe8qIetMjr4Dg.jpg','Cassie 与 Henry','Cassie & Henry','品牌','Branding'],
  ['lzGELWikhwP9CXpHzQLwbO4Iciw.png','倒数习作','Count Down','动态设计','Motion'],
  ['gztMNOHdeoVAo5mJKrYSQ8DMrw.png','Ableton 春夏','Ableton Springs & Summer','品牌','Branding'],
  ['iBPpWO0PJb82DHalYyVYKjX0js.mp4','场景习作','Scene Study','动态设计','Motion'],
  ['tSBfItHTMFDFhMixEPJ4uICmQ.mp4','数字倒计时','Count Down','动态设计','Motion'],
  ['33yATINY3VB78uBPgiG07P6Ors.png','活动追踪','Activity Tracker','创意编程','Code'],
].map(([file,zh,en,cz,ce])=>({file,title:bi(zh,en),category:bi(cz,ce)}));
export const faq = [
  [bi('开始合作后 第一步是什么','What’s the first thing that happens once we start?'),bi('先一起厘清真正需要解决的问题。我会了解用户、已有证据、团队约束和成功标准，再约定第一阶段的工作。','We start by understanding the problem: your users, the evidence you already have, the constraints, and what success would look like. Then we agree on a useful first step.')],
  [bi('实际的工作流程是怎样的','What does the process actually look like?'),bi('研究、方向探索、原型和细节打磨相互连接。尽早让你看到可以讨论的东西，通过反馈与验证持续推进，而不是最后才交付一个惊喜。','Research, exploration, prototypes, and finishing are connected. I share work early so there is something concrete to react to, then we test and refine it together.')],
  [bi('项目通常需要多久','How long does a project usually take?'),bi('取决于范围、团队投入和需要验证的问题。明确目标后会给出阶段计划与时间预估，有变化时及时沟通。','It depends on scope, team availability, and what we need to learn. Once the goal is clear, we agree on phases and a realistic timeline, and discuss changes as they happen.')],
  [bi('还不确定是否需要设计 可以聊聊吗','What if we’re not sure design is even the right move yet?'),bi('当然可以。先讨论问题，判断需要的是研究、产品方向还是界面设计；也可能暂时无需启动设计项目。','Absolutely. We can discuss whether research, product direction, or interface design would help. Sometimes the right next step is not a design project.')],
  [bi('怎样开始联系','How do we get started?'),bi('通过下方邮件入口介绍你的项目、时间安排以及希望解决的问题。此模板中的联系方式为演示配置，请在使用前替换。','Use the email link below to introduce the project, timing, and the problem you want to solve. The contact address in this template is a demo setting; replace it before use.')],
];
export function t(value: Bilingual, locale: TemplateLocale) { return value[locale]; }
