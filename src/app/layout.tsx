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

export const metadata: Metadata = {
  title: "Jenna — BI Analyst",
  description: "Tableau dashboards, SQL data marts, BI projects.",
};

const navItems = [
  { href: "/", label: "Work", dot: "bg-accent" },
  { href: "/about", label: "About", dot: "bg-foreground" },
  { href: "/contact", label: "Contact", dot: "bg-muted" },
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
              className="flex items-center gap-2 text-base font-semibold tracking-tight hover:opacity-70"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Jenna
            </Link>
            <nav className="flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:bg-subtle"
                >
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${item.dot}`} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 w-full">{children}</main>
        <footer className="w-full border-t border-border-subtle mt-24">
          <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Jenna · BI Analyst — Seoul, KR</span>
            </div>
            <span className="font-medium">© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
