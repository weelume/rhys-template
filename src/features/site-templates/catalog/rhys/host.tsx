'use client';
import { createContext, useContext, type ReactNode } from 'react';
import type { TemplateLocale } from '../../types';
export interface RhysHostOptions {
  brandName?: Record<TemplateLocale, string>;
  logo?: string;
  lightLogo?: string;
  marketplaceHref?: string;
  marketplaceLabel?: Record<TemplateLocale, string>;
  marketplaceAriaLabel?: Record<TemplateLocale, string>;
  filing?: ReactNode;
}
const Context = createContext<RhysHostOptions>({});
/** 通用页面通过显式宿主边界接收品牌、市场入口和备案。 */
export function RhysHostProvider({ children, ...options }: RhysHostOptions & { children: ReactNode }) { return <Context.Provider value={options}>{children}</Context.Provider>; }
export const useRhysHost = () => useContext(Context);
