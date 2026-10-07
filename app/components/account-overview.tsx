import Asset from "./prototype-asset";
import "./product-introduction.css";
import "./account-overview.css";

const loans = [
  { name: "햇살론 일반보증", period: "2026.01.15 ~ 2030.01.01", amount: "7,567,659원" },
  { name: "신용대출", period: "2024.05.13 ~ 2034.05.01", amount: "42,656,328원" },
];

export default function AccountOverview({ onBack }: { onBack: () => void }) {
  return (
    <div className="account-overview-frame" data-figma-node="307:1455">
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
      <section className="account-overview-summary" aria-labelledby="account-overview-title">
        <h4 id="account-overview-title">전체대출 현황</h4>
        <dl className="account-overview-totals">
          <div><dt>활동중인 대출</dt><dd className="account-overview-count">2 건<span>/2<span>건</span></span></dd></div>
          <div><dt>총 대출금액</dt><dd>59,000,000 원</dd></div>
          <div><dt>총 대출잔액</dt><dd>50,223,987 원</dd></div>
          <div className="account-overview-payment"><dt>총 결제대상금액</dt><dd>0 원</dd></div>
        </dl>
      </section>
      <section className="account-overview-loans" aria-labelledby="account-overview-loans-title">
        <div className="account-overview-toolbar">
          <h4 id="account-overview-loans-title">대출목록</h4>
          <span className="account-overview-filter">전체대출<Asset file="accounts-dropdown.svg"/></span>
        </div>
        <div className="account-overview-list">
          {loans.map((loan) => (
            <article key={loan.name} className="account-overview-card">
              <h4>{loan.name}</h4>
              <p className="account-overview-period">{loan.period}</p>
              <div className="account-overview-installment">
                <span className="account-overview-due">매달 <span>1일</span> 납부</span>
                <span className="account-overview-divider" aria-hidden="true"/>
                <span>{loan.amount}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
