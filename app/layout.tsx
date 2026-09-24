import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal';

export const metadata: Metadata = {
  title: '7 «А» Сынып Порталы | ClassRoutine',
  description: 'Мектеп сыныбына арналған сабақ кестесі, мұғалім мен оқушы байланысы, жетістіктер тақтасы, ата-аналар порталы және көңілді үзіліс жаттығулары.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <AppProvider>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </main>
          <Footer />
          <AuthModal />
        </AppProvider>
      </body>
    </html>
  );
}
