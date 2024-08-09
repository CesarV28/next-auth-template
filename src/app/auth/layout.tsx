
import { Navbar } from "@/components/navbar";
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
      <Navbar />
      <div className="w-full">
        <div className="parent-container lg:w-1/2 mx-auto px-4">
          <div className="lg:w-[30rem] pt-8 pb-28 lg:pt-20 mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
