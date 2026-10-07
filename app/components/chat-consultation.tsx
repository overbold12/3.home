import Asset from "./prototype-asset";
import "./chat-consultation.css";

const topics = ["신용대출", "자동차대출", "대출관리", "금융사고 안내", "자주하는질문"];

function ReferenceCrop({ className, alt = "" }: { className: string; alt?: string }) {
  return <div className={`chat-reference-crop ${className}`}><Asset file="chat-reference.png" alt={alt}/></div>;
}

export default function ChatConsultation({ onClose }: { onClose: () => void }) {
  return (
    <div className="chat-consultation-frame" data-figma-node="309:443">
      <ReferenceCrop className="chat-status"/>
      <header className="chat-header">
        <button type="button" className="chat-close" aria-label="메인 홈으로 돌아가기" onClick={onClose}><Asset file="chat-close.svg"/></button>
        <h4 className="chat-header-title">채팅상담</h4>
        <span className="chat-end">채팅종료</span>
      </header>
      <div className="chat-conversation-background"/>
      <p className="chat-date">2026년 10월 07일</p>
      <ReferenceCrop className="chat-avatar chat-avatar-greeting"/>
      <div className="chat-greeting">
        <ReferenceCrop className="chat-illustration" alt="채팅 상담 안내 일러스트"/>
        <p>안녕하세요 고객님~ 롯데캐피탈 채팅<br/>상담입니다.</p>
      </div>
      <p className="chat-time chat-time-greeting">오전 10:52</p>
      <ReferenceCrop className="chat-avatar chat-avatar-topics"/>
      <div className="chat-topic-introduction">
        <ReferenceCrop className="chat-topic-banner" alt="채팅상담 업무선택"/>
        <p>궁금하신 항목을 선택해주세요.</p>
      </div>
      <div className="chat-topics">
        {topics.map((topic) => <div key={topic} className="chat-topic" data-figma-component="311:644"><p>{topic}</p><Asset file="chat-chevron.svg"/></div>)}
      </div>
      <p className="chat-time chat-time-topics">오전 10:52</p>
      <div className="chat-scrollbar" aria-hidden="true"/>
      <div className="chat-scroll-top" aria-hidden="true"><Asset file="chat-scroll-circle.svg"/><Asset file="chat-scroll-arrow.svg"/></div>
      <div className="chat-message-bar">
        <Asset file="chat-camera.svg" className="chat-camera"/>
        <p>메시지의 버튼을 누르세요.</p>
        <Asset file="chat-emoticon.svg" className="chat-emoticon"/>
        <Asset file="chat-send.svg" className="chat-send"/>
      </div>
      <ReferenceCrop className="chat-system-navigation"/>
    </div>
  );
}
