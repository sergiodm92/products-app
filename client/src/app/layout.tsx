// src/app/layout.tsx

import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainLayout } from '@layouts/main-layout';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Products App',
  description: 'Scalboost challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
