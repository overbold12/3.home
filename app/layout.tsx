import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "홈화면 개편 | 프로토타입 시연",
  description: "새롭게 개편하는 앱 홈화면의 인터랙티브 프로토타입 시연 공간",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
