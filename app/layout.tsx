import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Katia Ivanuskina — Motion & Digital Designer",
  description: "Cinematic websites, motion concepts and interactive digital stories by Katia Ivanuskina.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
