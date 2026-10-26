# 架构

React 19、Next.js 15、TypeScript strict，动效复用 framer-motion。`src/app/[[...slug]]/page.tsx` 从 `meta.ts` 选择页面和语言，页面以服务端组合为主，浏览器交互集中在客户端组件中。

`src/features/site-templates/catalog/rhys/` 下，`config/brand.ts` 是品牌唯一入口；`content/data.ts` 保存列表与双语界面文案，`content/reference.json` 保存参考案例英文正文，`content/chinese.ts` 保存中文正文。主题令牌在 `tokens.css`，布局及响应式在 `theme.css`。`routing.ts` 为服务端和客户端共用的纯路由函数，不能从客户端组件导出供服务端调用。

`components/Shell.tsx` 管理导航、语言、联系与页脚；`Motion.tsx` 管理入场、旋转、拖拽和视频；`Cards.tsx` 管理作品、轮播、画廊和 FAQ。`pages/` 只组合各页内容。`host.tsx` 提供可选品牌、Logo 和扩展槽位，默认可独立运行。

素材在 `public/templates/rhys/`，展示截图在 `.tpl/assets/`。样式限制在当前模板及挂载期间的根滚动条标记内，卸载时清理，不增加全局滚动引擎。
