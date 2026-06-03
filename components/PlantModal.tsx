'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PlantData } from '@/constants/plantData';
import { COLORS } from '@/constants/colors';

interface PlantModalProps {
  plant: PlantData | null;
  onClose: () => void;
}

const difficultyColor: Record<string, string> = {
  easy: COLORS.green,
  medium: '#e07b00',
  hard: COLORS.red,
};

function ScoreStars({ score }: { score: number }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < score ? COLORS.green : 'rgba(48,58,30,0.2)', fontSize: 14 }}>
          ★
        </span>
      ))}
    </span>
  );
}

const careIcons: Record<string, string> = {
  sunlight: '☀️',
  water: '💧',
  temperature: '🌡️',
  pot: '🪴',
};

const careLabels: Record<string, string> = {
  sunlight: '햇빛',
  water: '물주기',
  temperature: '온도',
  pot: '화분',
};

export default function PlantModal({ plant, onClose }: PlantModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = plant ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [plant]);

  return (
    <AnimatePresence>
      {plant && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            className="relative w-full overflow-y-auto"
            style={{
              maxWidth: 860,
              maxHeight: '90vh',
              background: COLORS.bg,
              border: `1.5px solid ${COLORS.outline}`,
              borderRadius: 32,
              padding: 'clamp(32px, 5vw, 56px)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* X 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-[18px] transition-opacity hover:opacity-60"
              style={{
                background: COLORS.cardBg,
                border: `1.5px solid ${COLORS.outline}`,
                borderRadius: 9999,
                color: COLORS.text,
              }}
              aria-label="닫기"
            >
              ✕
            </button>

            {/* 헤더 */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pr-12">
              {/* 캐릭터 이미지 — 크기 조정: width/height 값 수정 */}
              <div className="relative flex-shrink-0" style={{ width: 88, height: 88 }}>
                <Image src={plant.profileSrc} alt={plant.name} fill className="object-contain" />
              </div>

              <div className="flex flex-col gap-2">
                {/* ahn 폰트 — 유지 */}
                <h2
                  className="font-ahn-bold text-[32px] lg:text-[40px] leading-tight"
                  style={{ color: COLORS.text }}
                >
                  {plant.name}
                </h2>
                {/* paperlogy-regular → 12px */}
                <p className="text-[12px]" style={{ color: COLORS.green }}>
                  {plant.tagline}
                </p>
              </div>
            </div>

            {/* 자기소개 — 편지 형태 */}
            <div
              className="mb-8 px-8 pt-7 pb-8 flex flex-col gap-5"
              style={{
                background: COLORS.bg,
                border: `1.5px solid ${COLORS.outline}`,
                borderRadius: 24,
                /* 줄이 그어진 노트 배경 */
                backgroundImage: `repeating-linear-gradient(
                  to bottom,
                  transparent,
                  transparent 25px,
                  ${COLORS.outline}18 25px,
                  ${COLORS.outline}18 26px
                )`,
                backgroundPositionY: '10px',
              }}
            >
              {/* 수신인 */}
              <p
                className="font-paperlogy-medium text-[13px]"
                style={{ color: COLORS.green }}
              >
                To. 나의 미래 메이트
              </p>
              {/* 본문 */}
              <p
                className="text-[12px] whitespace-pre-line"
                style={{ color: COLORS.text, lineHeight: '13px' }}
              >
                {plant.selfIntro}
              </p>
              {/* 발신인 */}
              <p
                className="font-paperlogy-medium text-[12px] self-end"
                style={{ color: COLORS.outline }}
              >
                From. {plant.name} 🌱
              </p>
            </div>

            {/* 집/사무실 적합도 */}
            <div className="mb-8">
              {/* ahn 폰트 — 유지 */}
              <h3 className="font-ahn-bold text-[20px] lg:text-[22px] mb-4" style={{ color: COLORS.text }}>
                어디서 키우면 좋을까요?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[
                  { icon: '🏠', label: '집에서 키우기', data: plant.suitability.home },
                  { icon: '🏢', label: '사무실에서 키우기', data: plant.suitability.office },
                ].map(({ icon, label, data }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-2 p-5"
                    style={{
                      background: COLORS.cardBg,
                      border: `1.5px solid ${COLORS.outline}`,
                      borderRadius: 16,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {/* 제목에 준하는 레이블 → paperlogy-medium 13px */}
                      <span className="font-paperlogy-medium text-[13px]" style={{ color: COLORS.text }}>
                        {icon} {label}
                      </span>
                      <ScoreStars score={data.score} />
                    </div>
                    {/* paperlogy-regular → 12px */}
                    <p className="text-[12px]" style={{ color: '#5a6352' }}>{data.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {/* 뱃지 — paperlogy-medium 13px */}
                <span
                  className="flex items-center gap-2 px-4 py-2 font-paperlogy-medium text-[13px]"
                  style={{
                    background: COLORS.cardBg,
                    border: `1.5px solid ${COLORS.outline}`,
                    borderRadius: 9999,
                    color: difficultyColor[plant.suitability.difficulty],
                  }}
                >
                  ⭐ 난이도: {plant.suitability.difficultyLabel}
                </span>
                <span
                  className="flex items-center gap-2 px-4 py-2 font-paperlogy-medium text-[13px]"
                  style={{
                    background: COLORS.cardBg,
                    border: `1.5px solid ${COLORS.outline}`,
                    borderRadius: 9999,
                    color: COLORS.text,
                  }}
                >
                  ⏱️ {plant.suitability.period}
                </span>
              </div>
            </div>

            {/* 관리 요령 */}
            <div className="mb-8">
              {/* ahn 폰트 — 유지 */}
              <h3 className="font-ahn-bold text-[20px] lg:text-[22px] mb-4" style={{ color: COLORS.text }}>
                관리 요령
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.keys(plant.care) as Array<keyof typeof plant.care>).map((key) => (
                  <div
                    key={key}
                    className="flex flex-col gap-2 p-4"
                    style={{
                      background: COLORS.cardBg,
                      border: `1.5px solid ${COLORS.outline}`,
                      borderRadius: 16,
                    }}
                  >
                    {/* 제목에 준하는 레이블 → paperlogy-medium 13px */}
                    <span className="font-paperlogy-medium text-[13px] flex items-center gap-1" style={{ color: COLORS.green }}>
                      {careIcons[key]} {careLabels[key]}
                    </span>
                    {/* paperlogy-regular → 12px */}
                    <p className="text-[12px]" style={{ color: COLORS.text }}>
                      {plant.care[key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 성장 단계 타임라인 */}
            <div className="mb-10">
              {/* ahn 폰트 — 유지 */}
              <h3 className="font-ahn-bold text-[20px] lg:text-[22px] mb-6" style={{ color: COLORS.text }}>
                성장 단계
              </h3>
              <div className="relative flex flex-col">
                <div
                  className="absolute left-4 top-4 bottom-4"
                  style={{ width: 1.5, background: COLORS.outline, opacity: 0.2 }}
                />
                {plant.growthSteps.map((s) => (
                  <div key={s.step} className="flex gap-5 relative pb-6">
                    {/* 단계 번호 원 — paperlogy-medium 13px */}
                    <div
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-paperlogy-medium text-[13px] z-10"
                      style={{
                        background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
                        border: `1.5px solid ${COLORS.outline}`,
                        borderRadius: 9999,
                        color: COLORS.text,
                      }}
                    >
                      {s.step}
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      {/* ahn 폰트 — 유지 */}
                      <p className="font-ahn-bold text-[17px] lg:text-[18px]" style={{ color: COLORS.text }}>
                        {s.title}
                      </p>
                      {/* paperlogy-regular → 12px */}
                      <p className="text-[12px] leading-relaxed" style={{ color: COLORS.green }}>
                        {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 하단 CTA */}
            <div className="flex justify-center">
              {/* CTA 버튼 — paperlogy-medium 13px */}
              <Link
                href="/shop"
                className="font-paperlogy-medium text-[13px] px-10 py-4 transition-opacity hover:opacity-80"
                style={{
                  background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
                  border: `1.5px solid ${COLORS.outline}`,
                  borderRadius: 9999,
                  color: COLORS.text,
                }}
              >
                {plant.name}과 시작하기 →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
