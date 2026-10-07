"use client";

/* eslint-disable @next/next/no-img-element -- Local Figma assets retain their original SVG dimensions. */
import { useState } from "react";

function Asset({ file, className = "", alt = "" }: { file: string; className?: string; alt?: string }) {
  return <img src={`/prototype/${file}`} className={className} alt={alt} draggable={false} />;
}

export default function HomePrototype() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="prototype-screen" data-figma-node="289:3352">
      <div className="prototype-scroll" tabIndex={0} role="region" aria-label="메인 홈 스크롤 영역">
        <div className="prototype-content">
      <header className="prototype-header">
        <div className="prototype-status" aria-hidden="true">
          <span className="prototype-time">9:41</span>
          <div className="prototype-status-icons"><Asset file="cellular.svg"/><Asset file="wifi.svg"/><Asset file="battery.svg"/></div>
        </div>
        <div className="prototype-user-row">
          <div className="prototype-user"><strong>김롯데님</strong><Asset file="chevron.svg"/></div>
          <div className="prototype-header-icons">
            <span className="prototype-notification"><Asset file="notification.svg"/></span>
            <span className="prototype-search"><Asset file="search-circle.svg"/><Asset file="search-handle.svg"/></span>
          </div>
        </div>
      </header>

      <div className="prototype-main">
        <section className="prototype-limit-card" aria-label="통합 한도조회">
          <p className="prototype-products">신용대출 · 자동차대출 · 햇살론</p>
          <h4>모든 상품 한도 확인하기</h4>
          <div className="prototype-limit-values">
            <div><span className="prototype-value-label">한도</span><div className="prototype-question-digits" aria-label="한도 조회 전">{Array.from({ length: 4 }, (_, index) => <span key={index}>?</span>)}</div></div>
            <div><span className="prototype-value-label">금리</span><div className="prototype-question-digits" aria-label="금리 조회 전"><span>?</span><span>?</span></div></div>
          </div>
          <div className="prototype-limit-action">통합 한도조회 시작하기</div>
        </section>

        <section className="prototype-account-card" aria-label="보유중인 계좌">
          <span className="prototype-service-icon prototype-inquiry-icon"><Asset file="credit-inquiry.svg"/></span>
          <h4>보유중인 계좌 확인하기</h4>
          <Asset file="chevron.svg" className="prototype-service-chevron"/>
          <p>보유 대출 <strong>2건</strong><br/>이번 달 원리금 <strong>1,091,831원</strong></p>
        </section>

        <div className="prototype-service-list">
          <div className="prototype-service-card">
            <span className="prototype-service-icon"><Asset file="credit-management.svg"/></span>
            <h4>신용 관리하러 가기</h4><Asset file="chevron.svg" className="prototype-service-chevron"/>
          </div>
          <div className="prototype-service-card">
            <span className="prototype-service-icon prototype-customer-icon"><Asset file="customer-service.svg"/></span>
            <h4>챗봇 상담 서비스</h4><Asset file="chevron.svg" className="prototype-service-chevron"/>
          </div>
        </div>
      </div>

      {showBanner && <aside className="prototype-voc-banner" aria-label="고객의 소리 안내">
        <Asset file="logo.png" className="prototype-voc-logo" alt="롯데캐피탈"/>
        <p>고객의 소리(VOC)를 통해 문의, 칭<br/>찬, 제안, 민원, 불편사항을 접수해<br/>주세요.</p>
        <div className="prototype-voc-crop" aria-hidden="true"><Asset file="voc-reference.png"/></div>
        <button className="prototype-banner-close" type="button" aria-label="고객의 소리 안내 닫기" onClick={() => setShowBanner(false)}><Asset file="close.svg"/></button>
      </aside>}

        </div>
      </div>

      <nav className="prototype-navigation" aria-label="앱 하단 메뉴">
        <button type="button" className="prototype-nav-item is-active" aria-current="page" onClick={(event) => event.currentTarget.closest(".prototype-screen")?.querySelector(".prototype-scroll")?.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="prototype-nav-icon prototype-home-icon"><Asset file="home.svg"/><Asset file="home-door.svg"/></span><span>홈</span>
        </button>
        <div className="prototype-nav-item"><span className="prototype-nav-icon"><Asset file="products.svg"/></span><span>금융상품</span></div>
        <div className="prototype-nav-item"><span className="prototype-nav-icon"><Asset file="menu.svg"/></span><span>전체</span></div>
      </nav>
    </div>
  );
}
