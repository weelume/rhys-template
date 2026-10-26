# 修改指南

在 `config/brand.ts` 修改品牌、邮件与年份，需同时修改市场元数据的名称和简介。联系方式默认为演示地址，发布前替换。不要将外部系统的专属内容写入通用页面。

在 `content/data.ts` 调整作品、文章与创意实验列表；英文全文在 `reference.json`，中文在 `chinese.ts`，两种语言同步维护。新页面在 `pages/` 编写，再登记 `meta.ts`、`.tpl/template.json` 的路由。所有站内链接使用 `routing.ts` 和传入的 basePath；切换语言保留页面、查询与锚点。

在 `tokens.css` 管理颜色、字体、字号、圆角与间距，在 `theme.css` 修改三端布局。主题不能污染其他页面。素材替换需放入 `public/templates/rhys/`，更新 ASSETS.json 与图片替代文字，视频保留播放状态和减少动态效果支持。

动效入口为 `Motion.tsx` 和 `Cards.tsx`，参数见 MOTION.md。修改后检查 PC 1440×1000、iPad 834×1180、H5 390×844，补测 320px 窄屏；按影响范围运行类型、lint、测试和页面验证。
