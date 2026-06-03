import { COLORS } from '@/constants/colors';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { num: 1, label: '식물 선택' },
  { num: 2, label: '옵션 설정' },
  { num: 3, label: '주문 정보' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-md mx-auto">
      {STEPS.map((step, i) => {
        const isDone = step.num < currentStep;
        const isCurrent = step.num === currentStep;

        return (
          <div key={step.num} className="flex items-center">
            {/* 연결선 (첫 번째 제외) */}
            {i > 0 && (
              <div
                style={{
                  width: 48,
                  height: 1.5,
                  background: isDone ? COLORS.green : '#E0E0E0',
                  transition: 'background 0.3s',
                }}
              />
            )}

            <div className="flex flex-col items-center gap-2">
              {/* 원형 아이콘 */}
              <div
                className="w-10 h-10 flex items-center justify-center text-[14px] font-paperlogy-medium transition-all duration-300"
                style={{
                  borderRadius: 9999,
                  background: isDone
                    ? COLORS.green
                    : isCurrent
                      ? `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`
                      : COLORS.cardBg,
                  border: isDone
                    ? `1.5px solid ${COLORS.green}`
                    : `1.5px solid ${isCurrent ? COLORS.outline : '#C8C8C8'}`,
                  color: isDone ? '#FFFFFF' : isCurrent ? COLORS.text : '#ADADAD',
                }}
              >
                {isDone ? '✓' : step.num}
              </div>

              {/* 레이블 */}
              <span
                className="text-[13px] font-paperlogy-medium whitespace-nowrap"
                style={{
                  color: isDone ? COLORS.green : isCurrent ? COLORS.text : '#ADADAD',
                  transition: 'color 0.3s',
                }}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
