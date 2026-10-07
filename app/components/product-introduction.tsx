import Asset from "./prototype-asset";
import "./product-introduction.css";

const products = ["신용대출", "자동차담보대출", "햇살론", "중금리 생활안정대출"];

export default function ProductIntroduction({ onBack }: { onBack: () => void }) {
  return (
    <div className="product-intro-frame" data-figma-node="316:2158">
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
      <section className="product-intro-main" aria-labelledby="product-introduction-title">
        <h4 className="product-intro-title" id="product-introduction-title">대출상품</h4>
        <div className="product-intro-list">
          {products.map((product) => <div key={product} className="product-intro-card"><strong>{product}</strong><span className="product-intro-chevron"><Asset file="product-chevron.svg"/></span></div>)}
        </div>
      </section>
    </div>
  );
}

