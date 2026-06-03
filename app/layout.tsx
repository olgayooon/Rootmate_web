import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rootmate — 식물이 자라면, 나도 자란다",
  description: "씨앗 하나로 시작하는 나만의 루틴. 함께 시작하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
