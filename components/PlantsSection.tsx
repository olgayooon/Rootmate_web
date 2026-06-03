'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { PLANTS, PlantData } from '@/constants/plantData';
import { COLORS } from '@/constants/colors';
import PlantModal from './PlantModal';

function ScoreRow({ icon, label, score }: { icon: string; label: string; score: number }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span style={{ color: COLORS.outline }}>
        {icon} {label}
      </span>
      <span>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ color: i < score ? COLORS.green : 'rgba(48,58,30,0.2)', fontSize: 13 }}>
            ★
          </span>
        ))}
      </span>
    </div>
  );
}

function PlantCard({ plant, onOpen, delay }: { plant: PlantData; onOpen: () => void; delay: number }) {
  const [hovered, setHovered] = useState(false);

  const speechMap: Record<string, string> = {
    basil: '"흙 한번 만져봐. 말랐으면 물 좀 줘."',
    tomato: '"물 한 잔이면 오늘도 쑥쑥 자랄 수 있어! (◍\'ᗜ\'◍)"',
    tulip: '"당신의 하루도 꽃처럼 피어나길 바라요. 🌷"',
  };

  return (
    <motion.div
      className="flex flex-col gap-5 p-8 lg:p-10 cursor-pointer transition-colors duration-300"
      style={{
        background: hovered
          ? `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`
          : COLORS.bg,
        border: `1.5px solid ${COLORS.outline}`,
        borderRadius: 32,
        minHeight: 420,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {/* 캐릭터 이미지 — 크기 조정: width/height 값 수정 */}
      <div className="relative mx-auto" style={{ width: 80, height: 80 }}>
        <Image
          src={plant.profileSrc}
          alt={plant.name}
          fill
          className="object-contain"
        />
      </div>

      {/* 이름 + 태그라인 */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-ahn-bold text-[24px] lg:text-[28px]" style={{ color: COLORS.text }}>
          {plant.name}
        </h3>
        <p className="text-[15px] lg:text-[16px]" style={{ color: COLORS.outline }}>
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

      {/* 적합도 간략 표시 */}
      <div
        className="flex flex-col gap-2 px-4 py-3"
        style={{
          background: COLORS.cardBg,
          border: `1.5px solid ${COLORS.outline}`,
          borderRadius: 16,
        }}
      >
        <ScoreRow icon="🏠" label="집" score={plant.suitability.home.score} />
        <ScoreRow icon="🏢" label="사무실" score={plant.suitability.office.score} />
        <span className="text-[13px] mt-0.5" style={{ color: COLORS.outline }}>
          ⏱️ {plant.suitability.period}
        </span>
      </div>

      {/* 말풍선 */}
      <div
        className="text-[14px] leading-relaxed px-4 py-3"
        style={{
          background: hovered ? 'rgba(255,255,255,0.6)' : COLORS.cardBg,
          border: `1.5px solid ${COLORS.outline}`,
          borderRadius: 16,
          color: COLORS.green,
          transition: 'background 0.3s',
        }}
      >
        {speechMap[plant.id]}
      </div>

      {/* 자세히 보기 버튼 — mt-auto로 카드 하단 고정 */}
      <button
        onClick={onOpen}
        className="font-paperlogy-medium text-[14px] px-6 py-2.5 w-full transition-opacity hover:opacity-70 mt-auto"
        style={{
          background: 'transparent',
          border: `1.5px solid ${COLORS.outline}`,
          borderRadius: 9999,
          color: COLORS.text,
          cursor: 'pointer',
        }}
      >
        자세히 보기 →
      </button>
    </motion.div>
  );
}

export default function PlantsSection() {
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);

  return (
    <>
      <section id="plants" style={{ padding: '100px 0', background: COLORS.bg }}>
        <div
          className="mx-auto px-6 lg:px-8"
          style={{ maxWidth: 1200 }}
        >
          <motion.h2
            className="font-ahn-bold text-center text-[36px] lg:text-[48px] mb-16"
            style={{ color: COLORS.green }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            나의 룸메이트를 선택해요
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANTS.map((plant, i) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onOpen={() => setSelectedPlant(plant)}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      <PlantModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />
    </>
  );
}
