import type { Metadata } from "next";
import Header from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer/Footer";

export const metadata: Metadata = {
  title: "login",
  description: "login to get access",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
