import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Architects_Daughter } from "next/font/google";
import Sidebar from "@/components/Siderbar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "연주의 플랜",
  description: "무조건 될 수 밖에 없는 플래너",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen">
          <div className="w-60">
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1">
            <div className="h-16">
              <Header />
            </div>
            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
