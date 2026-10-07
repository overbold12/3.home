"use client";

import { useRef } from "react";
import HomePrototype from "./home-prototype";
import ProductIntroduction from "./product-introduction";
import MenuPrototype from "./menu-prototype";
import PrototypeNavigation, { type PrototypeTab } from "./prototype-navigation";

export type PrototypePage = PrototypeTab;
export const prototypePageNames = { home: "메인 홈", products: "상품소개", all: "메뉴" };

export default function PrototypeView({ page, selectedTab, onNavigate }: { page: PrototypePage; selectedTab: PrototypeTab; onNavigate: (tab: PrototypeTab) => void }) {
  const scrollArea = useRef<HTMLDivElement>(null);

  function navigate(tab: PrototypeTab) {
    scrollArea.current?.scrollTo({ top: 0, behavior: "instant" });
    onNavigate(tab);
  }

  return (
    <div className="prototype-screen">
      <div key={page} className="prototype-scroll" ref={scrollArea} tabIndex={0} role="region" aria-label={`${prototypePageNames[page]} 스크롤 영역`}>
        <div className="prototype-content">
          {page === "home" ? <HomePrototype/> : page === "products" ? <ProductIntroduction onBack={() => navigate("home")}/> : <MenuPrototype/>}
        </div>
      </div>
      <PrototypeNavigation selected={selectedTab} onSelect={navigate}/>
    </div>
  );
}
