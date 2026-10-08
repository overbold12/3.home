"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Asset from "./prototype-asset";
import LoanSheets, { type LoanSheet } from "./loan-sheets";
import { annualRate, changeAmount, changePeriod, clampAmount, firstMonthlyPayment, initialConditions, repaymentNames, type LoanConditionsValue } from "./loan-calculation";
import "./loan-conditions.css";

export default function LoanConditions() {
  const [conditions, setConditions] = useState(initialConditions);
  const [sheet, setSheet] = useState<LoanSheet | null>(null);
  const [amountDraft, setAmountDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function openSheet(nextSheet: LoanSheet, event: MouseEvent<HTMLButtonElement>) {
    trigger.current = event.currentTarget;
    setAmountDraft(conditions.amount.toLocaleString("ko-KR"));
    setSheet(nextSheet);
  }

  function closeSheet() {
    setSheet(null);
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }

  function normalizedAmount() { return clampAmount(Number(amountDraft.replaceAll(",", "")), conditions.period); }

  function completeAmount() {
    const amount = normalizedAmount();
    if (Number(amountDraft.replaceAll(",", "")) !== amount) {
      setAmountDraft(amount.toLocaleString("ko-KR"));
      return;
    }
    applyConditions(changeAmount(conditions, amount));
  }

  function applyConditions(nextConditions: LoanConditionsValue) {
    if (timer.current) return;
    setSheet(null);
    setLoading(true);
    timer.current = setTimeout(() => {
      setConditions(nextConditions);
      setLoading(false);
      timer.current = null;
      requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
    }, 650);
  }

  return (
    <div className="prototype-screen loan-conditions-screen" aria-busy={loading}>
      <div className="prototype-scroll" tabIndex={0} role="region" aria-label="대출조건 설정 스크롤 영역" inert={sheet !== null || loading}>
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
            <section className="loan-conditions-review" aria-label="적용된 대출조건" aria-live="polite">
              <dl>
                <div><dt>한도</dt><dd>{conditions.amount.toLocaleString("ko-KR")}만원</dd></div>
                <div><dt>금리</dt><dd>{annualRate(conditions.period).toFixed(2)}%</dd></div>
                <div className="loan-conditions-payment"><dt>첫 달 예상 납입금액</dt><dd>{firstMonthlyPayment(conditions).toLocaleString("ko-KR")}원</dd></div>
              </dl>
              <span className="loan-conditions-schedule">상환스케줄<Asset file="loan-schedule-chevron.svg"/></span>
            </section>
            <Asset file="loan-divider.svg" className="loan-conditions-divider"/>
            <section className="loan-conditions-fields" aria-labelledby="loan-conditions-fields-title">
              <h4 id="loan-conditions-fields-title">조건 입력</h4>
              <p className="loan-conditions-hint">선택한 대출 기간에 따라 최대 한도가 달라져요</p>
              <dl>
                <div className="loan-condition-field"><dt id="loan-amount-label">신청 금액</dt><dd id="loan-amount-value">{conditions.amount.toLocaleString("ko-KR")}만원<span className="loan-conditions-chevron"><Asset file="loan-chevron.svg"/></span></dd><button type="button" className="loan-field-trigger" aria-labelledby="loan-amount-label loan-amount-value" aria-haspopup="dialog" onClick={event => openSheet("amount", event)}/></div>
                <div className="loan-condition-field"><dt id="loan-period-label">대출 기간</dt><dd id="loan-period-value">{conditions.period}개월<span className="loan-conditions-chevron"><Asset file="loan-chevron.svg"/></span></dd><button type="button" className="loan-field-trigger" aria-labelledby="loan-period-label loan-period-value" aria-haspopup="dialog" onClick={event => openSheet("period", event)}/></div>
                <div className="loan-condition-field"><dt><span id="loan-repayment-label">상환 방식</span><button type="button" className="loan-guide-trigger" aria-label="상환 방식 안내" aria-haspopup="dialog" onClick={event => openSheet("guide", event)}><Asset file="loan-question.svg"/></button></dt><dd id="loan-repayment-value">{repaymentNames[conditions.repayment]}<span className="loan-conditions-chevron"><Asset file="loan-chevron.svg"/></span></dd><button type="button" className="loan-field-trigger" aria-labelledby="loan-repayment-label loan-repayment-value" aria-haspopup="dialog" onClick={event => openSheet("repayment", event)}/></div>
              </dl>
            </section>
            <div className="loan-conditions-submit">이 조건으로 대출 신청하기</div>
          </div>
        </div>
      </div>
      {sheet && <LoanSheets sheet={sheet} conditions={conditions} draft={amountDraft} onDraftChange={setAmountDraft} onNormalize={() => setAmountDraft(normalizedAmount().toLocaleString("ko-KR"))} onAmountComplete={completeAmount} onPeriod={period => applyConditions(changePeriod(conditions, period))} onRepayment={repayment => applyConditions({ ...conditions, repayment })} onClose={closeSheet}/>}
      {loading && <div className="loan-loading" role="status" aria-label="대출조건 계산 중"><Asset file="LoadingSpinner.png"/></div>}
    </div>
  );
}
