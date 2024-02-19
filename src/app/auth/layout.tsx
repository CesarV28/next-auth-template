import { Navbar } from "@/components/auth/navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to app",
  description: "This page is for login to the app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Navbar/>
        { children }
    </div>
  );
}
