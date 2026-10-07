"use client";

import { useRef, useState, type ReactNode } from "react";
import PrototypeView, { prototypePageNames, type PrototypePage } from "./components/prototype-view";
import type { PrototypeTab } from "./components/prototype-navigation";

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    reset: <><path d="M3 10a9 9 0 1 1 2 8"/><path d="M3 4v6h6"/></>,
    expand: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>,
    phone: <><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/></>,
    cursor: <path d="m5 3 14 10-7 1-3 7L5 3Z"/>,
    scroll: <><rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 6v4"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PrototypePage>("home");
  const [selectedTab, setSelectedTab] = useState<PrototypeTab>("home");
  const currentPageName = prototypePageNames[currentPage];
  const [prototypeVersion, setPrototypeVersion] = useState(0);
  const [notice, setNotice] = useState("");
  const stage = useRef<HTMLElement>(null);

  function restartPrototype() {
    setCurrentPage("home");
    setSelectedTab("home");
    setPrototypeVersion((version) => version + 1);
    setNotice("");
  }

  function navigatePrototype(page: PrototypePage) {
    if (page !== "accounts") setSelectedTab(page);
    setCurrentPage(page);
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
        <div className="heading"><div className="eyebrow">HOME REDESIGN</div><h1>홈화면 개편</h1></div>
        <div className="header-divider"/>
        <p className="header-description">새로운 홈 경험을 미리 만나보세요.</p>
        <span className="presentation-badge"><span/>프로토타입 시연</span>
      </header>
      <main className="workspace">
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
              </div>
              <div className="device-frame" role="region" aria-labelledby="current-page-name">
                <PrototypeView key={prototypeVersion} page={currentPage} selectedTab={selectedTab} onNavigate={navigatePrototype}/>
              </div>
              <div className="device-caption">모바일 프레임 <span>·</span> 인터랙티브 미리보기</div>
            </div>
            <span className="canvas-corner">PROTOTYPE WORKSPACE</span>
          </div>
          <div className="preview-footer"><span className="interaction-note"><span className="live-dot"/>프레임 안에서 자유롭게 시연해 보세요</span><div className="interaction-keys"><span><Icon name="cursor" size={14}/>클릭으로 탐색</span><span><Icon name="scroll" size={14}/>스크롤로 이동</span></div></div>
          {notice && <p className="notice" role="status">{notice}</p>}
        </section>
        <footer className="page-footer"><span>더 나은 경험을 위한 변화의 시작</span><span>HOME REDESIGN <span className="footer-dot">·</span> PROTOTYPE</span></footer>
      </main>
    </div>
  );
}
