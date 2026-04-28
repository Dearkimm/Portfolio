import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://portfolio-pi-cyan-fzcirn5lpo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jenna — BI Analyst",
  description: "Tableau dashboards, SQL data marts, BI projects.",
  openGraph: {
    title: "Jenna — BI Analyst",
    description: "Tableau dashboards, SQL data marts, BI projects.",
    url: SITE_URL,
    siteName: "Jenna · Portfolio",
    locale: "ko_KR",
    type: "website",
  },
};

const navItems = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background">
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between gap-6">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight hover:text-accent transition-colors"
            >
              Jenna
            </Link>
            <nav className="flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-full text-sm font-medium hover:bg-subtle hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 w-full">{children}</main>
        <footer className="w-full border-t border-border-subtle mt-24">
          <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted">
            <span>Jenna · BI Analyst — Seoul, KR</span>
            <span className="font-medium">© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
