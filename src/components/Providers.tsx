'use client';

import { LocaleProvider } from '@/contexts/LocaleContext';
import { ReactNode } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <LanguageSwitcher />
      {children}
    </LocaleProvider>
  );
}
