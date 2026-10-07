"use client";

import { useState } from "react";
import Asset from "./prototype-asset";
import "./home-prototype.css";

export default function HomePrototype({ onAccounts }: { onAccounts: () => void }) {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div data-figma-node="289:3352">
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
          <h4 id="prototype-account-title">보유중인 계좌 확인하기</h4>
          <Asset file="chevron.svg" className="prototype-service-chevron"/>
          <p>보유 대출 <strong>2건</strong><br/>이번 달 원리금 <strong>1,091,831원</strong></p>
          <button type="button" className="prototype-account-trigger" aria-labelledby="prototype-account-title" onClick={onAccounts}/>
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
  );
}
