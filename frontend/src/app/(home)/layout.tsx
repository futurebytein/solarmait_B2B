"use client";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer/Footer";
import StickyButton from "@/components/UI/StickyButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <StickyButton />

      <Footer />
    </>
  );
}
