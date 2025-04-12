import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const poppins = Poppins({subsets: ["latin"], weight: "400"});

export const metadata: Metadata = {
  title: "Task management app",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}