import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "개선사항 내용 | 프로토타입 시연",
  description: "앱 홈 화면과 대출조건 입력 화면의 개선사항을 확인하는 프로토타입 시연 공간",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
