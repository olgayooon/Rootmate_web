'use client';

import Image from 'next/image';
import { PLANTS } from '@/constants/plantData';
import { COLORS } from '@/constants/colors';

interface Step1Props {
  selectedPlant: 'basil' | 'tomato' | 'tulip' | null;
  onSelect: (id: 'basil' | 'tomato' | 'tulip') => void;
  onNext: () => void;
}

export default function Step1PlantSelect({ selectedPlant, onSelect, onNext }: Step1Props) {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANTS.map((plant) => {
          const isSelected = selectedPlant === plant.id;
          return (
            <button
              key={plant.id}
              onClick={() => onSelect(plant.id)}
              className="relative flex flex-col gap-4 p-8 text-left transition-all duration-300 cursor-pointer"
              style={{
                background: isSelected
                  ? `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`
                  : COLORS.bg,
                border: isSelected
                  ? `2px solid ${COLORS.green}`
                  : `1.5px solid ${COLORS.outline}`,
                borderRadius: 32,
              }}
            >
              {/* 체크 뱃지 */}
              {isSelected && (
                <div
                  className="absolute top-5 right-5 w-6 h-6 flex items-center justify-center text-[13px]"
                  style={{
                    background: COLORS.green,
                    borderRadius: 9999,
                    color: '#FFFFFF',
                  }}
                >
                  ✓
                </div>
              )}

              {/* 캐릭터 이미지 — 크기 조정: width/height 값 수정 */}
              <div className="relative mx-auto" style={{ width: 80, height: 80 }}>
                <Image src={plant.profileSrc} alt={plant.name} fill className="object-contain" />
              </div>

              {/* 식물명 + 태그라인 */}
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="font-ahn-bold text-[24px]" style={{ color: COLORS.text }}>
                  {plant.name}
                </h3>
                <p className="text-[15px]" style={{ color: COLORS.green }}>
                  {plant.tagline}
                </p>
                <span
                  className="font-paperlogy-medium text-[13px] px-3 py-1 mt-1"
                  style={{
                    background: COLORS.bg,
                    border: `1.5px solid ${COLORS.outline}`,
                    borderRadius: 9999,
                    color: COLORS.green,
                  }}
                >
                  {plant.personality}
                </span>
              </div>

              {/* 구분선 */}
              <div style={{ height: 1, background: `${COLORS.outline}20` }} />

              {/* 난이도 + 기간 */}
              <div className="flex flex-col gap-2">
                <span className="text-[14px]" style={{ color: COLORS.outline }}>
                  ⭐ {plant.suitability.difficultyLabel}
                </span>
                <span className="text-[14px]" style={{ color: COLORS.outline }}>
                  ⏱️ {plant.suitability.period}
                </span>
              </div>

              {/* 한 줄 소개 */}
              <p
                className="text-[14px] leading-relaxed"
                style={{
                  color: COLORS.green,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {plant.cardIntro}
              </p>
            </button>
          );
        })}
      </div>

      {/* 다음 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedPlant}
          className="font-ahn-bold text-[17px] px-10 py-4 transition-all duration-200"
          style={{
            background: selectedPlant
              ? `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`
              : COLORS.cardBg,
            border: `1.5px solid ${COLORS.outline}`,
            borderRadius: 9999,
            color: COLORS.text,
            opacity: selectedPlant ? 1 : 0.4,
            cursor: selectedPlant ? 'pointer' : 'not-allowed',
          }}
        >
          이 식물로 시작하기 →
        </button>
      </div>
    </div>
  );
}
