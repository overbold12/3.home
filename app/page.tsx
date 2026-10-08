"use client";

import { useRef, useState, type ReactNode } from "react";
import PrototypeView, { prototypePageNames, type PrototypePage } from "./components/prototype-view";
import type { PrototypeTab } from "./components/prototype-navigation";
import { homeVariantNames, type HomeVariant } from "./components/home-prototype";
import LoanConditions from "./components/loan-conditions";
import LoanInputRules from "./components/loan-input-rules";
import "./home-variants.css";

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    reset: <><path d="M3 10a9 9 0 1 1 2 8"/><path d="M3 4v6h6"/></>,
    expand: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>,
    phone: <><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/></>,
    cursor: <path d="m5 3 14 10-7 1-3 7L5 3Z"/>,
    scroll: <><rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 6v4"/></>,
    home: <><path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/></>,
    document: <><path d="M14 3H5v18h14V8Z"/><path d="M14 3v5h5M8 12h8M8 16h5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<"home" | "loan">("home");
  const [currentPage, setCurrentPage] = useState<PrototypePage>("home");
  const [selectedTab, setSelectedTab] = useState<PrototypeTab>("home");
  const [homeVariant, setHomeVariant] = useState<HomeVariant>("default");
  const currentPageName = currentPage === "home" ? `${prototypePageNames.home} · ${homeVariantNames[homeVariant]}` : prototypePageNames[currentPage];
  const [prototypeVersion, setPrototypeVersion] = useState(0);
  const [loanVersion, setLoanVersion] = useState(0);
  const [notice, setNotice] = useState("");
  const stage = useRef<HTMLElement>(null);

  function restartPrototype() {
    setHomeVariant("default");
    setCurrentPage("home");
    setSelectedTab("home");
    setPrototypeVersion((version) => version + 1);
    setNotice("");
  }

  function restartLoanPrototype() {
    setLoanVersion(version => version + 1);
    setNotice("");
  }

  function navigatePrototype(page: PrototypePage) {
    if (homeVariant !== "default") return;
    if (page === "home" || page === "products" || page === "all") setSelectedTab(page);
    setCurrentPage(page);
  }

  function switchHomeVariant(variant: HomeVariant) {
    setHomeVariant(variant);
    setCurrentPage("home");
    setSelectedTab("home");
    setPrototypeVersion((version) => version + 1);
    setNotice("");
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await stage.current?.requestFullscreen();
    } catch {
      setNotice("이 브라우저에서는 전체 화면을 사용할 수 없습니다.");
    }
  }

  return (
    <div className="app-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true"><span/><span/><span/><span/></div>
        <div className="heading"><div className="eyebrow">APP IMPROVEMENTS</div><h1>개선사항 내용</h1></div>
        <div className="header-divider"/>
        <p className="header-description">앱의 개선사항을 미리 만나보세요.</p>
        <span className="presentation-badge"><span/>프로토타입 시연</span>
      </header>
      <div className="workspace-layout">
        <aside className="workspace-sidebar">
          <div className="sidebar-label">개선 항목</div>
          <nav className="section-navigation" aria-label="개선사항 메뉴">
            <button type="button" className="section-navigation-item" aria-current={selectedSection === "home" ? "page" : undefined} aria-controls="improvement-content" onClick={() => setSelectedSection("home")}><Icon name="home"/><span>홈 화면</span></button>
            <button type="button" className="section-navigation-item" aria-current={selectedSection === "loan" ? "page" : undefined} aria-controls="improvement-content" onClick={() => setSelectedSection("loan")}><Icon name="document"/><span>대출조건 입력</span></button>
          </nav>
        </aside>
      <main className="workspace" id="improvement-content">
        {selectedSection === "home" ? <>
        <div className="workspace-heading"><div><span className="section-label">PREVIEW</span><h2>새로운 홈, 새로운 시작</h2><p>직접 눌러보고 스크롤하며 달라진 홈화면을 살펴보세요.</p></div><span className="workspace-number">01 <span>/ HOME</span></span></div>
        <section className="preview-panel" ref={stage} aria-label="프로토타입 시연 영역">
          <div className="preview-toolbar">
            <div className="preview-title"><Icon name="phone"/><span>홈화면 프로토타입</span></div>
            <div className="toolbar-actions" role="group" aria-label="시연 도구">
              <button type="button" className="restart-button" onClick={restartPrototype}><Icon name="reset" size={16}/><span>처음부터</span></button>
              <button className="icon-button" title="전체 화면 전환" aria-label="전체 화면 전환" onClick={toggleFullscreen}><Icon name="expand"/></button>
            </div>
          </div>
          <div className="preview-canvas">
            <div className="device-wrap">
              <div className="current-page" aria-live="polite">
                <h3 id="current-page-name">{currentPageName}</h3>
                <div className="home-variant-chips" role="group" aria-label="메인 홈 버전 선택">
                  {(Object.keys(homeVariantNames) as HomeVariant[]).map((variant) => <button key={variant} type="button" className="home-variant-chip" aria-pressed={homeVariant === variant} onClick={() => switchHomeVariant(variant)}>{homeVariantNames[variant]}</button>)}
                </div>
              </div>
              <div className="device-frame" role="region" aria-labelledby="current-page-name">
                <PrototypeView key={prototypeVersion} page={currentPage} selectedTab={selectedTab} homeVariant={homeVariant} onNavigate={navigatePrototype}/>
              </div>
              <div className="device-caption">모바일 프레임 <span>·</span> 인터랙티브 미리보기</div>
            </div>
            <span className="canvas-corner">PROTOTYPE WORKSPACE</span>
          </div>
          <div className="preview-footer"><span className="interaction-note"><span className="live-dot"/>프레임 안에서 자유롭게 시연해 보세요</span><div className="interaction-keys"><span><Icon name="cursor" size={14}/>클릭으로 탐색</span><span><Icon name="scroll" size={14}/>스크롤로 이동</span></div></div>
          {notice && <p className="notice" role="status">{notice}</p>}
        </section>
        </> : <>
          <div className="workspace-heading"><div><span className="section-label">PREVIEW</span><h2>대출조건 입력 개편</h2><p>대출조건 입력 화면의 개선 내용을 확인하는 공간입니다.</p></div><span className="workspace-number">02 <span>/ LOAN</span></span></div>
          <section className="preview-panel loan-preview-panel" ref={stage} aria-labelledby="loan-preview-title">
            <div className="preview-toolbar">
              <div className="preview-title"><Icon name="document"/><span id="loan-preview-title">대출조건 입력 프로토타입</span></div>
              <div className="toolbar-actions" role="group" aria-label="시연 도구">
                <button type="button" className="restart-button" onClick={restartLoanPrototype}><Icon name="reset" size={16}/><span>처음부터</span></button>
                <button type="button" className="icon-button" title="전체 화면 전환" aria-label="전체 화면 전환" onClick={toggleFullscreen}><Icon name="expand"/></button>
              </div>
            </div>
            <div className="preview-canvas loan-preview-canvas">
              <div className="device-wrap">
                <div className="current-page"><h3 id="loan-frame-title">대출조건 설정(TO-BE)</h3></div>
                <div className="device-frame" role="region" aria-labelledby="loan-frame-title"><LoanConditions key={loanVersion}/></div>
                <div className="device-caption">모바일 프레임 <span>·</span> 미리보기</div>
              </div>
              <LoanInputRules/>
              <span className="canvas-corner">PROTOTYPE WORKSPACE</span>
            </div>
            {notice && <p className="notice" role="status">{notice}</p>}
          </section>
        </>}
        <footer className="page-footer"><span>더 나은 경험을 위한 변화의 시작</span><span>APP IMPROVEMENTS <span className="footer-dot">·</span> PROTOTYPE</span></footer>
      </main>
      </div>
    </div>
  );
}
