'use client';

import { COLORS } from '@/constants/colors';

interface Step2Props {
  quantity: number;
  isGift: boolean;
  giftMessage: string;
  giftRecipientName: string;
  onQuantityChange: (q: number) => void;
  onGiftToggle: (v: boolean) => void;
  onGiftMessageChange: (v: string) => void;
  onGiftRecipientChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const inputStyle = {
  border: `1.5px solid ${COLORS.outline}`,
  borderRadius: 12,
  padding: '14px 16px',
  fontSize: 15,
  color: COLORS.text,
  background: COLORS.bg,
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
};

export default function Step2Options({
  quantity,
  isGift,
  giftMessage,
  giftRecipientName,
  onQuantityChange,
  onGiftToggle,
  onGiftMessageChange,
  onGiftRecipientChange,
  onNext,
  onBack,
}: Step2Props) {
  return (
    <div className="flex flex-col gap-8">

      {/* 수량 선택 */}
      <section
        className="flex flex-col gap-5 p-8"
        style={{ background: COLORS.bg, border: `1.5px solid ${COLORS.outline}`, borderRadius: 24 }}
      >
        <h3 className="font-ahn-bold text-[20px]" style={{ color: COLORS.text }}>수량</h3>
        <div className="flex items-center gap-5">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center text-[18px] transition-opacity hover:opacity-70"
            style={{
              border: `1.5px solid ${COLORS.outline}`,
              borderRadius: 9999,
              color: COLORS.text,
              background: COLORS.bg,
              cursor: 'pointer',
            }}
          >
            −
          </button>
          <span className="font-ahn-bold text-[22px] w-8 text-center" style={{ color: COLORS.text }}>
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(Math.min(10, quantity + 1))}
            className="w-9 h-9 flex items-center justify-center text-[18px] transition-opacity hover:opacity-70"
            style={{
              border: `1.5px solid ${COLORS.outline}`,
              borderRadius: 9999,
              color: COLORS.text,
              background: COLORS.bg,
              cursor: 'pointer',
            }}
          >
            +
          </button>
          <span className="text-[14px]" style={{ color: '#6b7560' }}>최대 10개</span>
        </div>
      </section>

      {/* 선물 옵션 */}
      <section
        className="flex flex-col gap-5 p-8"
        style={{ background: COLORS.bg, border: `1.5px solid ${COLORS.outline}`, borderRadius: 24 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-ahn-bold text-[20px]" style={{ color: COLORS.text }}>선물로 보내기</h3>
          {/* 토글 스위치 */}
          <button
            onClick={() => onGiftToggle(!isGift)}
            className="relative transition-all duration-300"
            style={{
              width: 52,
              height: 28,
              borderRadius: 9999,
              background: isGift ? COLORS.green : COLORS.cardBg,
              border: `1.5px solid ${isGift ? COLORS.green : COLORS.outline}`,
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="선물 옵션 토글"
          >
            <span
              className="absolute top-[3px] transition-all duration-300"
              style={{
                width: 18,
                height: 18,
                borderRadius: 9999,
                background: '#FFFFFF',
                left: isGift ? 28 : 4,
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
          </button>
        </div>

        {/* 선물 ON 시 추가 입력 */}
        {isGift && (
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-2">
              <label className="font-paperlogy-medium text-[14px]" style={{ color: COLORS.outline }}>
                받는 분 이름
              </label>
              <input
                type="text"
                value={giftRecipientName}
                onChange={(e) => onGiftRecipientChange(e.target.value)}
                placeholder="이름을 적으면 메시지 카드에 함께 인쇄돼요"
                className="shop-input"
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-paperlogy-medium text-[14px]" style={{ color: COLORS.outline }}>
                메시지 카드 <span style={{ color: '#6b7560' }}>(선택)</span>
              </label>
              <div className="relative">
                <textarea
                  value={giftMessage}
                  onChange={(e) => onGiftMessageChange(e.target.value.slice(0, 100))}
                  placeholder="받는 분께 전할 말을 적어주세요. (최대 100자)"
                  rows={4}
                  className="shop-input resize-none"
                  style={{ ...inputStyle, paddingBottom: 32 }}
                />
                <span
                  className="absolute bottom-3 right-3 text-[12px]"
                  style={{ color: '#6b7560' }}
                >
                  {giftMessage.length}/100
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 배송 안내 */}
      <div
        className="flex flex-col gap-3 p-5"
        style={{ background: COLORS.cardBg, border: `1.5px solid ${COLORS.outline}`, borderRadius: 16 }}
      >
        {[
          { icon: '📦', text: '구성품: 씨앗 봉투 · 화분 · 앱 연동 코드' },
          { icon: '🚚', text: '배송: 주문 후 3~5 영업일 이내 출고' },
          { icon: '💳', text: '결제: 다음 단계에서 진행' },
        ].map(({ icon, text }) => (
          <p key={text} className="text-[14px] flex gap-2" style={{ color: COLORS.outline }}>
            <span>{icon}</span>
            <span>{text}</span>
          </p>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="font-paperlogy-medium text-[16px] px-8 py-3 transition-opacity hover:opacity-70"
          style={{
            background: COLORS.bg,
            border: `1.5px solid ${COLORS.outline}`,
            borderRadius: 9999,
            color: COLORS.text,
            cursor: 'pointer',
          }}
        >
          ← 이전
        </button>
        <button
          onClick={onNext}
          className="font-ahn-bold text-[17px] px-10 py-4 transition-opacity hover:opacity-80"
          style={{
            background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
            border: `1.5px solid ${COLORS.outline}`,
            borderRadius: 9999,
            color: COLORS.text,
            cursor: 'pointer',
          }}
        >
          다음 단계 →
        </button>
      </div>
    </div>
  );
}
