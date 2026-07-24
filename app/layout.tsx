import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "websell - Pre-built Website Marketplace & Visual Customizer",
  description: "Buy professional websites, customize them visually without seeing code, and receive source code instantly in your Gmail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-white font-sans">{children}</body>
    </html>
  );
}
