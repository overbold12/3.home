import Asset from "./prototype-asset";
import "./product-introduction.css";
import "./menu-prototype.css";

const groups = [
  { title: "마이페이지", items: ["전체계좌조회", "거래내역조회", "신용관리서비스", "범칙금조회", "보험정보조회", "담보물 변경 신청", "상환스케줄조회", "내정보관리"] },
  { title: "대출", items: ["대출 통합 한도조회", "신용대출", "자동차담보대출", "대환대출", "햇살론", "추가대출", "신청서작성", "전세자금대출", "신용조회동의", "대출상담사조회", "대출계산기"] },
  { title: "자동차금융", items: ["상품소개", "신용조회동의", "스마트서류제출", "추가서류제출", "결제정보 및 청구지 등록", "전자약정", "차량인수등록", "에이전시 조회"] },
  { title: "리스금융", items: ["모바일 물건점검 보고서", "일반/리스 금융상담연락처", "에이전시조회"] },
  { title: "모바일서류제출", items: ["재직/소득서류제출", "신분증제출", "추가서류제출"] },
  { title: "알림", items: ["공지사항", "이벤트", "약관", "개인정보처리방침", "대출모집인수수료율 공시", "금융소비자보호포털"] },
];

export default function MenuPrototype() {
  return (
    <div className="menu-frame" data-figma-node="307:1813">
      <header className="product-intro-header">
        <div className="product-intro-status" aria-hidden="true">
          <span className="product-intro-time">9:41</span>
          <Asset file="product-cellular.svg" className="product-intro-cellular"/>
          <Asset file="product-wifi.svg" className="product-intro-wifi"/>
          <span className="product-intro-batteryBorder"/><span className="product-intro-batteryFill"/>
          <Asset file="product-battery-cap.svg" className="product-intro-batteryCap"/>
        </div>
        <span className="menu-close" aria-hidden="true"><Asset file="menu-close.svg"/></span>
      </header>

      <div className="menu-profile">
        <div className="menu-avatar" aria-hidden="true"><Asset file="menu-profile-background.svg" className="menu-profile-background"/><Asset file="menu-profile.png" className="menu-profile-image"/></div>
        <p>김롯데님,<br/>안녕하세요.</p>
        <span className="menu-profile-chevron"><Asset file="menu-chevron.svg"/></span>
      </div>

      <div className="menu-shortcuts">
        <div className="menu-customer-shortcut"><span className="menu-service-icon"><Asset file="menu-service.svg"/></span><span>고객센터</span></div>
        <div className="menu-certificate-shortcut"><span className="menu-certificate-icon" aria-hidden="true"><Asset file="menu-certificate.svg" className="menu-certificate-sheet"/><Asset file="menu-certificate-mark.svg" className="menu-certificate-mark"/><span className="menu-lock-arch"/><span className="menu-lock-body"/><Asset file="menu-lock-line.svg" className="menu-lock-line"/></span><span>공동인증센터</span></div>
      </div>

      <div className="menu-groups">
        {groups.map(({ title, items }) => <section className="menu-group" key={title} aria-label={title}>
          <h4>{title}</h4>
          <div className="menu-items">{items.map((item) => <div key={item} className={`menu-item${item === "개인정보처리방침" ? " menu-privacy" : ""}`}>{item}</div>)}</div>
        </section>)}
        <div className="menu-logout">로그아웃</div>
      </div>
    </div>
  );
}
