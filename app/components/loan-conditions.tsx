import Asset from "./prototype-asset";
import "./loan-conditions.css";

// 변경 기능은 추후 구현. 기간별 한도·금리 및 금액별 기간 제한: docs/loan-conditions.md
const initialReview = { amount: "3,000만원", rate: "11.45%", period: "120개월" };

export default function LoanConditions() {
  return (
    <div className="prototype-screen">
      <div className="prototype-scroll" tabIndex={0} role="region" aria-label="대출조건 설정 스크롤 영역">
        <div className="prototype-content loan-conditions-content" data-figma-node="335:4960">
          <header className="loan-conditions-header">
            <div className="prototype-status loan-conditions-status" aria-hidden="true">
              <span className="prototype-time">9:41</span>
              <div className="prototype-status-icons"><Asset file="loan-cellular.svg"/><Asset file="loan-wifi.svg"/><Asset file="loan-battery.svg"/></div>
            </div>
            <div className="loan-conditions-navigation">
              <span className="loan-conditions-close" aria-hidden="true"><Asset file="loan-close.svg"/></span>
              <div className="loan-conditions-steps" aria-label="1단계 대출정보">
                <span className="loan-conditions-current-step"><Asset file="loan-current-oval.svg"/><span>1</span></span>
                <strong>대출정보</strong>
                <div className="loan-conditions-next-steps" aria-hidden="true">{[2, 3, 4, 5].map(step => <span key={step}><Asset file="loan-step-oval.svg"/><span>{step}</span></span>)}</div>
              </div>
            </div>
          </header>
          <div className="loan-conditions-body">
            <h4 className="loan-conditions-heading">김롯데님의 심사 결과를<br/>알려드려요</h4>
            <section className="loan-conditions-review" aria-label="최초 심사결과">
              <dl>
                <div><dt>한도</dt><dd>{initialReview.amount}</dd></div>
                <div><dt>금리</dt><dd>{initialReview.rate}</dd></div>
                <div className="loan-conditions-payment"><dt>첫 달 예상 납입금액</dt><dd>360,541원</dd></div>
              </dl>
              <span className="loan-conditions-schedule">상환스케줄<Asset file="loan-schedule-chevron.svg"/></span>
            </section>
            <Asset file="loan-divider.svg" className="loan-conditions-divider"/>
            <section className="loan-conditions-fields" aria-labelledby="loan-conditions-fields-title">
              <h4 id="loan-conditions-fields-title">조건 입력</h4>
              <p className="loan-conditions-hint">선택한 대출 기간에 따라 최대 한도가 달라져요</p>
              <dl>
                <div><dt>신청 금액</dt><dd>{initialReview.amount}<span className="loan-conditions-chevron"><Asset file="loan-chevron.svg"/></span></dd></div>
                <div><dt>대출 기간</dt><dd>{initialReview.period}<span className="loan-conditions-chevron"><Asset file="loan-chevron.svg"/></span></dd></div>
                <div><dt>상환 방식<Asset file="loan-question.svg"/></dt><dd>원리금균등<span className="loan-conditions-chevron"><Asset file="loan-chevron.svg"/></span></dd></div>
              </dl>
            </section>
            <div className="loan-conditions-submit">이 조건으로 대출 신청하기</div>
          </div>
        </div>
      </div>
    </div>
  );
}
