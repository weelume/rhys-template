import type { ReactNode } from 'react';
import './globals.css';
export const metadata = { title: 'Rhys Studio · 产品设计', description: '产品设计师作品、随笔与创意探索' };
export default function Layout({ children }: {
    children: ReactNode;
}) { return <html lang="zh-CN" data-scroll-behavior="smooth"><body>{children}</body></html>; }
