import Asset from "./prototype-asset";
import "./product-introduction.css";

const items = ["회원정보변경", "비밀번호변경", "알림리스트", "알림설정", "회원탈퇴"];

export default function PersonalInformation({ onBack }: { onBack: () => void }) {
  return (
    <div className="product-intro-frame" data-figma-node="332:2725">
      <header className="product-intro-header">
        <div className="product-intro-status" aria-hidden="true">
          <span className="product-intro-time">9:41</span>
          <Asset file="product-cellular.svg" className="product-intro-cellular"/>
          <Asset file="product-wifi.svg" className="product-intro-wifi"/>
          <span className="product-intro-batteryBorder"/><span className="product-intro-batteryFill"/>
          <Asset file="product-battery-cap.svg" className="product-intro-batteryCap"/>
        </div>
        <button className="product-intro-back" type="button" aria-label="메인 홈으로 돌아가기" onClick={onBack}><Asset file="product-back.svg"/></button>
      </header>
      <section className="product-intro-main" aria-labelledby="personal-information-title">
        <h4 className="product-intro-title" id="personal-information-title">내정보관리</h4>
        <div className="product-intro-list">
          {items.map((item) => <div key={item} className="product-intro-card"><strong>{item}</strong><span className="product-intro-chevron"><Asset file="product-chevron.svg"/></span></div>)}
        </div>
      </section>
    </div>
  );
}
