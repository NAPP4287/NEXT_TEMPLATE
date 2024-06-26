import dynamic from "next/dynamic";
import type { Metadata } from "next";
// css
import "@/public/css/global.css";
// lib
import RecoilRootWrapper from "@/lib/RecoilRoot";

export const metadata: Metadata = {
  title: "NEXT TEMPLATE",
  description: "Generated by create next app",
};

const DynamicComponentWithNoSSRLoading = dynamic(
  () => import("@/components/molecules/modals/Loading"),
  { ssr: false }
);

const DynamicComponentWithNoSSRAlert = dynamic(
  () => import("@/components/molecules/modals/AlertModal"),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <RecoilRootWrapper>
        <body>
          <div className="max-width">{children}</div>
          <DynamicComponentWithNoSSRLoading />
          <DynamicComponentWithNoSSRAlert />
        </body>
      </RecoilRootWrapper>
    </html>
  );
}
