import type { Metadata } from "next";
import { AppFooter } from "@/components/app-footer/app-footer";
import { Geist, Geist_Mono } from "next/font/google";
import { AppHeader } from "@/components/app-header/app-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fullstack Challenge",
  description: "Frontend foundation for the fullstack coding challenge.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-100 text-slate-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <AppHeader />
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
            {children}
          </main>
          <AppFooter />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
