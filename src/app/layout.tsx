import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { Navbar } from "@/components/layout/Navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Yazidane Hakim — Portfolio",
  description: "Software engineer",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="overflow-x-hidden">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Navbar />
      </body>
    </html>
  );
}
