export type RepaymentMethod = "annuity" | "principal";
export type LoanConditionsValue = { amount: number; period: number; repayment: RepaymentMethod };

// 금액 단위: 만원. 경계값 1,000만원은 120개월까지 선택 가능하다.
export const minimumAmount = 100;
export const loanPeriods = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
export const repaymentNames = { annuity: "원리금균등", principal: "원금균등" };
export const initialConditions: LoanConditionsValue = { amount: 3000, period: 120, repayment: "annuity" };

export function maximumAmount(period: number) { return period <= 60 ? 1000 : 3000; }
export function annualRate(period: number) { return period <= 60 ? 10.56 : 11.45; }
export function maximumPeriod(amount: number) { return amount < 1000 ? 60 : 120; }

export function clampAmount(amount: number, period: number) {
  if (Number.isNaN(amount)) return minimumAmount;
  return Math.max(minimumAmount, Math.min(maximumAmount(period), Math.trunc(amount)));
}

export function changeAmount(current: LoanConditionsValue, amount: number): LoanConditionsValue {
  const nextAmount = clampAmount(amount, current.period);
  return { ...current, amount: nextAmount, period: Math.min(current.period, maximumPeriod(nextAmount)) };
}

export function changePeriod(current: LoanConditionsValue, period: number): LoanConditionsValue {
  const allowed = loanPeriods.filter(value => value <= maximumPeriod(current.amount));
  const nextPeriod = allowed.includes(period) ? period : allowed[allowed.length - 1];
  return { ...current, period: nextPeriod, amount: clampAmount(current.amount, nextPeriod) };
}

export function firstMonthlyPayment(conditions: LoanConditionsValue) {
  const principal = conditions.amount * 10000;
  const monthlyRate = annualRate(conditions.period) / 100 / 12;
  const payment = conditions.repayment === "principal"
    ? principal / conditions.period + principal * monthlyRate
    : principal * monthlyRate / (1 - (1 + monthlyRate) ** -conditions.period);
  return Math.round(payment);
}
