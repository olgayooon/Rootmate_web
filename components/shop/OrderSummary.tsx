import { PLANTS } from '@/constants/plantData';
import { COLORS } from '@/constants/colors';
import { PRICING } from '@/constants/pricing';

interface OrderSummaryProps {
  plant: 'basil' | 'tomato' | 'tulip' | null;
  quantity: number;
  isGift: boolean;
  step: 1 | 2 | 3;
  onSubmit?: () => void;
  isSubmitValid?: boolean;
}

export default function OrderSummary({
  plant,
  quantity,
  isGift,
  step,
  onSubmit,
  isSubmitValid,
}: OrderSummaryProps) {
  const plantData = PLANTS.find((p) => p.id === plant);
  const total = PRICING.kitPrice * quantity + PRICING.shippingFee;

  return (
    <div
      className="flex flex-col gap-5 p-8"
      style={{
        background: COLORS.bg,
        border: `1.5px solid ${COLORS.outline}`,
        borderRadius: 32,
        position: 'sticky',
        top: 100,
      }}
    >
      <h3 className="font-ahn-bold text-[25px]" style={{ color: COLORS.text }}>주문 요약</h3>
      <div style={{ height: 1, background: `${COLORS.outline}20` }} />

      {/* 선택한 식물 */}
      {plantData ? (
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 32 }}>{plantData.emoji}</span>
          <div>
            <p className="font-ahn-bold text-[20px]" style={{ color: COLORS.text }}>
              {plantData.name}
            </p>
            <p className="text-[13px]" style={{ color: COLORS.green }}>
              {plantData.tagline}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-[14px]" style={{ color: '#ADADAD' }}>식물을 선택해주세요</p>
      )}

      {/* 수량 + 선물 여부 */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-[14px]">
          <span style={{ color: COLORS.outline }}>수량</span>
          <span className="font-paperlogy-medium" style={{ color: COLORS.text }}>{quantity}개</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span style={{ color: COLORS.outline }}>구분</span>
          <span className="font-paperlogy-medium" style={{ color: COLORS.text }}>
            {isGift ? '🎁 선물' : '직접 사용'}
          </span>
        </div>
      </div>

      <div style={{ height: 1, background: `${COLORS.outline}20` }} />

      {/* 가격 */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-[14px]">
          <span style={{ color: COLORS.outline }}>
            키트 {PRICING.kitPrice.toLocaleString()}원 × {quantity}개
          </span>
          <span style={{ color: COLORS.text }}>{(PRICING.kitPrice * quantity).toLocaleString()}원</span>
        </div>
        <div className="flex justify-between text-[14px]">
          <span style={{ color: COLORS.outline }}>배송비</span>
          <span style={{ color: COLORS.green }}>
            {PRICING.shippingFee === 0 ? '무료' : `${PRICING.shippingFee.toLocaleString()}원`}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-ahn-bold text-[20px]" style={{ color: COLORS.text }}>합계</span>
          <span className="font-ahn-bold text-[24px]" style={{ color: COLORS.green }}>
            {total.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* 구성품 안내 */}
      <div
        className="flex flex-col gap-1 p-4 text-[13px]"
        style={{ background: COLORS.cardBg, border: `1.5px solid ${COLORS.outline}`, borderRadius: 12 }}
      >
        <p style={{ color: COLORS.outline }}>📦 구성품</p>
        <p style={{ color: '#6b7560' }}>씨앗 봉투 · 화분 · 앱 코드 · 관리 카드</p>
      </div>

      {/* Step 3에서 주문하기 버튼 반복 */}
      {step === 3 && (
        <button
          onClick={isSubmitValid ? onSubmit : undefined}
          className="font-paperlogy-medium text-[16px] w-full py-4 transition-opacity"
          style={{
            background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
            border: `1.5px solid ${COLORS.outline}`,
            borderRadius: 9999,
            color: COLORS.text,
            opacity: isSubmitValid ? 1 : 0.4,
            cursor: isSubmitValid ? 'pointer' : 'not-allowed',
          }}
        >
          주문하기
        </button>
      )}
    </div>
  );
}
