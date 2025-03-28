import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOLAR-MAIT B2B ",
  description: "",
};
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
