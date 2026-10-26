import Link from 'next/link';
export default function NotFound() { return <main style={{ padding: 48, fontFamily: 'sans-serif' }}><h1>404 · 页面不存在 / Page not found</h1><Link href="/">返回首页 / Home</Link></main>; }
