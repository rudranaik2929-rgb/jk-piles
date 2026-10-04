import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppToaster } from "@/components/layout/AppToaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "J.K. Pile & Construction",
  description: "Construction Operations Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppToaster>
            {children}
          </AppToaster>
        </AuthProvider>
      </body>
    </html>
  );
}
