import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Frameworks Learning Lab",
  description:
    "Compare Next.js, Vue, Angular, TanStack Start and Astro across binding, state, routing, rendering, tooling and enterprise adoption.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteNav />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
        <footer className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground">
            A learning monorepo — the four other frameworks run as their own dev servers.
            See the root <code className="text-foreground">README.md</code> to launch each.
          </div>
        </footer>
      </body>
    </html>
  );
}
