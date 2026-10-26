# Rhys 产品设计师作品集

首先阅读 [.tpl/README.md](.tpl/README.md)。这是可独立运行的 React / Next.js 双语作品集，包含 8 个项目、6 篇随笔、15 个创意实验、关于、FAQ 和联系区。新增隐私与条款页，共 21 页，默认中文，英文使用 `/en`。没有数据库、注册、真实表单提交或在线追踪。

Node 版本见 `.nvmrc`，pnpm 固定 9.15.4。准备 `.env.example` 中的可选端口与主机配置后，执行 `pnpm install --frozen-lockfile`，`pnpm dev`，打开终端打印的本机地址（默认 `http://127.0.0.1:43430`）；Ctrl+C 停止自己的进程。生产预览执行 `pnpm build` 再 `pnpm start`。检查为 `pnpm typecheck`、`pnpm lint`、`pnpm test`，协议检查为 `pnpm tpl:check`。

品牌和联系方式在 `config/brand.ts`；正文与双语在 `content/`；颜色、字号与间距在 `tokens.css`；布局在 `theme.css`；交互在 `components/`；页面在 `pages/`，注册在 `meta.ts`。上述路径均相对 `src/features/site-templates/catalog/rhys/`。运行素材位于 `public/templates/rhys/`。

简历与模板下载仅显示演示提示，邮件为示例地址。原站素材的商业再分发权未确认，模板保持未上架，使用前须处理授权。详见 `.tpl/docs/LICENSE.md`。打包使用 `pnpm bundle`，只输出通用运行包；完整源码交付以 Git 固定提交为准。
