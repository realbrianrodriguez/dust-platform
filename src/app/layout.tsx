import { Inter } from 'next/font/google';
import { Web3Provider } from '@/components/Web3Provider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dust - Decentralized Supplement Platform',
  description: 'A Web3-native platform for token-gated supplement commerce with real-time blockchain visualizations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
} 