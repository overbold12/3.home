import { annualRate, maximumAmount } from "./loan-calculation";
import "./loan-input-rules.css";

export default function LoanInputRules() {
  return (
    <aside className="loan-input-rules" aria-labelledby="loan-input-rules-title">
      <div className="loan-rules-heading"><span className="section-label">INPUT RULES</span><h3 id="loan-input-rules-title">대출조건 입력 로직</h3><p>기간과 금액에 따른 입력 조건</p></div>
      <section className="loan-rules-section"><h4>기간별 한도·금리</h4><table><thead><tr><th scope="col">대출 기간</th><th scope="col">최대한도</th><th scope="col">적용금리</th></tr></thead><tbody>{[60, 120].map(period => <tr key={period}><th scope="row">{period === 60 ? "12~60개월" : "72~120개월"}</th><td>{maximumAmount(period).toLocaleString("ko-KR")}만원</td><td>{annualRate(period).toFixed(2)}%</td></tr>)}</tbody></table></section>
      <section className="loan-rules-section"><h4>신청 금액과 기간</h4><ul><li>최소 신청 금액: <strong>100만원</strong></li><li>대출 기간 선택: <strong>12개월 단위</strong></li></ul></section>
    </aside>
  );
}
