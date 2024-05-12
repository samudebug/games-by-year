import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Games by Year",
  description: "See what games was launched in the year you were born!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "dark",
          "h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        {children}
        <footer className="flex items-center justify-center my-3">
        <span>Made with love by <a href="https://github.com/samudebug" className="underline">samudebug</a></span>
        </footer>
      </body>
    </html>
  );
}
