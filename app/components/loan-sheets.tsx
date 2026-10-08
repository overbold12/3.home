import { useEffect, useRef, type KeyboardEvent } from "react";
import Asset from "./prototype-asset";
import { loanPeriods, maximumAmount, maximumPeriod, repaymentNames, type LoanConditionsValue, type RepaymentMethod } from "./loan-calculation";

export type LoanSheet = "amount" | "period" | "repayment" | "guide";

function RepaymentGraph({ principal = false }: { principal?: boolean }) {
  return <div className={`loan-repayment-graph${principal ? " is-principal" : ""}`} aria-hidden="true">
    <div className="loan-graph-bars">
      <span className="loan-graph-bar loan-graph-first"><span className="loan-graph-interest">이자</span><span className="loan-graph-fill"/></span>
      <span className="loan-graph-bar loan-graph-second"><Asset file={principal ? "loan-principal-second.svg" : "loan-annuity-second.svg"}/></span>
      <span className="loan-graph-bar loan-graph-third"><Asset file={principal ? "loan-principal-third.svg" : "loan-annuity-third.svg"}/></span>
      <span className="loan-graph-ellipsis">…</span>
      <span className="loan-graph-bar loan-graph-last"><Asset file={principal ? "loan-principal-third.svg" : "loan-annuity-last.svg"}/><span className="loan-graph-principal">원금</span></span>
    </div>
  </div>;
}

export default function LoanSheets({ sheet, conditions, draft, onDraftChange, onNormalize, onAmountComplete, onPeriod, onRepayment, onClose }: {
  sheet: LoanSheet;
  conditions: LoanConditionsValue;
  draft: string;
  onDraftChange: (value: string) => void;
  onNormalize: () => void;
  onAmountComplete: () => void;
  onPeriod: (period: number) => void;
  onRepayment: (repayment: RepaymentMethod) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const shortPeriod = maximumPeriod(conditions.amount) === 60;
  const node = sheet === "amount" ? "341:560" : sheet === "period" ? (shortPeriod ? "341:468" : "341:366") : sheet === "repayment" ? "341:603" : "344:1027";

  useEffect(() => {
    const first = dialog.current?.querySelector<HTMLElement>(sheet === "amount" ? "input" : "button:not(:disabled)");
    first?.focus({ preventScroll: true });
    if (first instanceof HTMLInputElement) first.select();
  }, [sheet]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") { event.preventDefault(); onClose(); }
    if (event.key !== "Tab") return;
    const focusable = Array.from(dialog.current?.querySelectorAll<HTMLElement>("button:not(:disabled), input") ?? []);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  return <div className="loan-sheet-layer">
    <button type="button" className="loan-sheet-backdrop" aria-label="바텀시트 닫기" tabIndex={-1} onClick={onClose}/>
    <div ref={dialog} className={`loan-sheet loan-sheet-${sheet}`} role="dialog" aria-modal="true" aria-labelledby="loan-sheet-title" onKeyDown={onKeyDown}>
      <div className="loan-sheet-content" data-figma-node={node}>
        {sheet === "amount" ? <form className="loan-amount-form" onSubmit={event => { event.preventDefault(); onNormalize(); }}>
          <dl className="loan-amount-limits"><div><dt>최대한도</dt><dd>{maximumAmount(conditions.period).toLocaleString("ko-KR")}만원</dd></div><div><dt>최소한도</dt><dd>100만원</dd></div></dl>
          <label id="loan-sheet-title" htmlFor="loan-amount-input">신청 금액</label>
          <div className="loan-amount-input-wrap"><input id="loan-amount-input" type="text" inputMode="numeric" enterKeyHint="done" autoComplete="off" value={draft} onChange={event => onDraftChange(event.target.value.replace(/[^\d,-]/g, ""))} onBlur={onNormalize} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); onNormalize(); } }}/><span>만원</span></div>
          <p className="loan-amount-hint"><span><Asset file="loan-amount-info.svg"/></span><span>신청 금액이 1,000만원 미만일 경우 대출 기간은 60개월까지만 가능해요.</span></p>
          <button type="button" className="loan-amount-complete" onPointerDown={event => event.preventDefault()} onClick={onAmountComplete}>완료</button>
        </form> : sheet === "period" ? <div className="loan-period-options">
          <h4 id="loan-sheet-title">대출 기간을 선택해주세요</h4>
          <div role="group" aria-label="대출 기간">{loanPeriods.map(period => {
            const disabled = shortPeriod && period > 60;
            return <button key={period} type="button" disabled={disabled} aria-pressed={conditions.period === period} onClick={() => onPeriod(period)}>{period}개월{!disabled && <Asset file={conditions.period === period ? "loan-check-selected.svg" : "loan-check-default.svg"}/>}</button>;
          })}</div>
        </div> : sheet === "repayment" ? <div className="loan-repayment-options">
          <h4 id="loan-sheet-title">상환방식을 선택해주세요</h4>
          <div role="group" aria-label="상환 방식">{(Object.keys(repaymentNames) as RepaymentMethod[]).map(method => <button key={method} type="button" aria-pressed={conditions.repayment === method} onClick={() => onRepayment(method)}>{repaymentNames[method]}<Asset file={conditions.repayment === method ? "loan-check-selected.svg" : "loan-check-default.svg"}/></button>)}</div>
        </div> : <div className="loan-repayment-guide">
          <div className="loan-guide-heading"><h4 id="loan-sheet-title">대출 상환방식</h4><button type="button" aria-label="상환 방식 안내 닫기" onClick={onClose}><Asset file="loan-guide-close.svg"/></button></div>
          <section><h4>원리금균등</h4><p>원금과 이자를 합쳐<br/>매달 같은 금액을 갚아요.</p><RepaymentGraph/></section>
          <section><h4>원금균등</h4><p>원금은 매달 같은 금액으로 갚고,<br/>이자는 점점 줄어들어요.</p><RepaymentGraph principal/></section>
        </div>}
      </div>
    </div>
  </div>;
}
