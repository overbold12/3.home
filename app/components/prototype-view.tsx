"use client";

import { useRef } from "react";
import HomePrototype from "./home-prototype";
import ProductIntroduction from "./product-introduction";
import MenuPrototype from "./menu-prototype";
import AccountOverview from "./account-overview";
import CreditManagement from "./credit-management";
import ChatConsultation from "./chat-consultation";
import PersonalInformation from "./personal-information";
import PrototypeNavigation, { type PrototypeTab } from "./prototype-navigation";

export type PrototypePage = PrototypeTab | "accounts" | "credit" | "chat" | "profile";
export const prototypePageNames = { home: "메인 홈", products: "상품소개", all: "메뉴", accounts: "전체계좌조회", credit: "신용관리서비스", chat: "채팅상담", profile: "내정보관리" };

export default function PrototypeView({ page, selectedTab, onNavigate }: { page: PrototypePage; selectedTab: PrototypeTab; onNavigate: (page: PrototypePage) => void }) {
  const scrollArea = useRef<HTMLDivElement>(null);

  function navigate(tab: PrototypePage) {
    scrollArea.current?.scrollTo({ top: 0, behavior: "instant" });
    onNavigate(tab);
  }

  return (
    <div className="prototype-screen">
      <div key={page} className="prototype-scroll" ref={scrollArea} tabIndex={0} role="region" aria-label={`${prototypePageNames[page]} 스크롤 영역`}>
        <div className="prototype-content">
          {page === "home" ? <HomePrototype onAccounts={() => navigate("accounts")} onCredit={() => navigate("credit")} onChat={() => navigate("chat")} onProfile={() => navigate("profile")}/> : page === "products" ? <ProductIntroduction onBack={() => navigate("home")}/> : page === "accounts" ? <AccountOverview onBack={() => navigate("home")}/> : page === "credit" ? <CreditManagement onBack={() => navigate("home")}/> : page === "chat" ? <ChatConsultation onClose={() => navigate("home")}/> : page === "profile" ? <PersonalInformation onBack={() => navigate("home")}/> : <MenuPrototype/>}
        </div>
      </div>
      {(page === "home" || page === "products" || page === "all") && <PrototypeNavigation selected={selectedTab} onSelect={navigate}/>}
    </div>
  );
}
