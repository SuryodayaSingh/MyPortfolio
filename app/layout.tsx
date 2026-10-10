import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suryodaya Singh — Full-Stack Developer",
  description:
    "Portfolio of Suryodaya Singh, a B.Tech IT student and full-stack developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}