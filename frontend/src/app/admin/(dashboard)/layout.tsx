"use client";

import withAdminAuth from "@/hooks/withAdminAuth";
import DefaultLayout from "@/components/Admin/Layout";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DefaultLayout>{children}</DefaultLayout>;
}

export default withAdminAuth(RootLayout);
