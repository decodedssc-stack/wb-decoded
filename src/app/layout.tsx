import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import StudentSidebar from '@/components/layout/StudentSidebar';
import AdminSidebar from '@/components/layout/AdminSidebar';
import MobileNav from '@/components/layout/MobileNav';
import SplashScreen from '@/components/SplashScreen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-bengali',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#00A389',
};

export const metadata: Metadata = {
  title: 'WB Decoded — West Bengal Govt Exam Mock Test & Analytics Platform',
  description: 'Premium PYQ, Mock Test, Practice, and Analytics Platform for West Bengal Competitive Examinations (WBCS, WB Police SI, Food SI, Clerkship, Primary TET, SSC).',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WB Decoded',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansBengali.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-[#F4F6F8] text-[#1E293B] font-sans min-h-screen flex flex-col antialiased overflow-x-hidden w-full max-w-[100vw]">
        <SplashScreen />
        <Navbar />
        <div className="flex-1 flex w-full max-w-7xl mx-auto overflow-x-hidden">
          {/* Main content body */}
          <main className="flex-1 min-w-0 pb-20 lg:pb-8 overflow-x-hidden">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
