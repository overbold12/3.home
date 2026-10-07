import Asset from "./prototype-asset";
import "./credit-management.css";

const benefits = [
  <>신용 정보에 변동이 발생하면 알려드려요</>,
  <>내 신용 정보를 확인할 수 있는 보고서를<br/>보내드려요</>,
  <>신용 조회 알림으로 나도 모르는 신용거래가<br/>발생하는지 알 수 있어요</>,
  <>고객님께 맞는 롯데캐피탈 대출 상품을<br/>추천드려요</>,
];

export default function CreditManagement({ onBack }: { onBack: () => void }) {
  return (
    <div className="credit-management-frame" data-figma-node="300:1276">
      <header className="credit-management-header">
        <div className="prototype-status" aria-hidden="true">
          <span className="prototype-time">9:41</span>
          <div className="prototype-status-icons"><Asset file="cellular.svg"/><Asset file="wifi.svg"/><Asset file="battery.svg"/></div>
        </div>
        <button type="button" className="credit-management-back" aria-label="메인 홈으로 돌아가기" onClick={onBack}><Asset file="product-back.svg"/></button>
      </header>
      <section className="credit-management-card" aria-labelledby="credit-management-title">
        <h4 id="credit-management-title">신용관리 서비스를 이용하면</h4>
        <p className="credit-management-subtitle">아래와 같은 <strong>혜택</strong>을 받을 수 있어요</p>
        <ul className="credit-management-benefits">
          {benefits.map((benefit, index) => <li key={index}><span className="credit-management-check"><Asset file="credit-check.svg"/></span><p>{benefit}</p></li>)}
        </ul>
      </section>
      <div className="credit-management-action">신용 관리하러 가기</div>
    </div>
  );
}
