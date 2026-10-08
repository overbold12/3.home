import assert from "node:assert/strict";
import { test } from "node:test";
import { annualRate, changeAmount, changePeriod, clampAmount, firstMonthlyPayment, initialConditions, loanPeriods, maximumAmount, maximumPeriod } from "./loan-calculation.ts";

test("금액 입력은 현재 기간의 최대한도와 고정 최소한도로 보정", () => {
  assert.equal(clampAmount(99, 120), 100);
  assert.equal(clampAmount(0, 60), 100);
  assert.equal(clampAmount(-500, 120), 100);
  assert.equal(clampAmount(3001, 120), 3000);
  assert.equal(clampAmount(3000, 60), 1000);
  assert.equal(clampAmount(NaN, 60), 100);
  assert.equal(clampAmount(Infinity, 120), 3000);
});

test("사용자 예시: 500만원 입력 시 기간은 최대 60개월", () => {
  assert.deepEqual(changeAmount(initialConditions, 500), { amount: 500, period: 60, repayment: "annuity" });
});

test("사용자 예시: 60개월 선택 시 금액은 최대 1,000만원", () => {
  assert.deepEqual(changePeriod(initialConditions, 60), { amount: 1000, period: 60, repayment: "annuity" });
});

test("1,000만원 미만과 정확히 1,000만원의 기간 제한", () => {
  assert.equal(maximumPeriod(999), 60);
  assert.equal(maximumPeriod(1000), 120);
  assert.equal(changePeriod({ ...initialConditions, amount: 999, period: 60 }, 120).period, 60);
  assert.equal(changePeriod({ ...initialConditions, amount: 1000, period: 60 }, 120).period, 120);
});

test("기간별 한도와 금리, 선택을 반복해도 허용 조건 유지", () => {
  for (const period of loanPeriods) {
    assert.equal(maximumAmount(period), period <= 60 ? 1000 : 3000);
    assert.equal(annualRate(period), period <= 60 ? 10.56 : 11.45);
    for (const amount of [0, 100, 500, 999, 1000, 1500, 3000, 99999]) {
      for (const current of [changePeriod(changeAmount(initialConditions, amount), period), changeAmount(changePeriod(initialConditions, period), amount)]) {
        assert.ok(current.amount >= 100 && current.amount <= maximumAmount(current.period));
        assert.ok(current.period <= maximumPeriod(current.amount));
      }
    }
  }
});

test("원리금균등 및 원금균등의 첫 달 예상 납입금액", () => {
  assert.equal(firstMonthlyPayment(initialConditions), 420929);
  assert.equal(firstMonthlyPayment({ ...initialConditions, repayment: "principal" }), 536250);
  assert.equal(firstMonthlyPayment({ amount: 1000, period: 60, repayment: "principal" }), 254667);
  const payment = firstMonthlyPayment({ amount: 1000, period: 60, repayment: "annuity" });
  const r = .1056 / 12;
  let balance = 10000000;
  for (let month = 0; month < 60; month++) balance = balance * (1 + r) - payment;
  assert.ok(Math.abs(balance) < 60, "원 단위 반올림 범위에서 마지막 달 잔액 상환");
});
