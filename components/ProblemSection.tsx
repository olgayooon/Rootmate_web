'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';

const problems = [
  {
    imageSrc: '/images/alarm.png',
    title: '현생도 바쁜데\n식물까지 챙길 수 있을까요..?',
    sub: '캐릭터가 먼저 말을 걸어요.\n까먹을 틈이 없어요.',
  },
  {
    imageSrc: '/images/water.png',
    title: '사다 놓는 족족\n다 죽여버렸어요 TㅅT',
    sub: '딱 맞는 타이밍에 알림을 드려요!\n물 주는 것도, 햇빛도 걱정 끝!',
  },
  {
    imageSrc: '/images/archive.png',
    title: '자라는 모습을\n기록으로 남기고 싶어요!',
    sub: '사진을 찍으면 캐릭터도 함께 자라요!\n성장 기록이 더 즐거워져요.',
  },
];

export default function ProblemSection() {
  return (
    <section id="about" style={{ background: COLORS.cardBg, padding: '100px 0' }}>
      <div
        className="mx-auto px-6 lg:px-8 flex flex-col items-center"
        style={{ maxWidth: 1200 }}
      >
        <motion.p
          className="text-[18px] lg:text-[20px]"
          style={{ color: COLORS.green }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          이런 적 있으신가요?
        </motion.p>

        <motion.h2
          className="font-ahn-bold text-[36px] lg:text-[48px] text-center mt-4 mb-16"
          style={{ color: COLORS.text }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          식집사의 고민
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-4 p-8 lg:p-10"
              style={{
                background: COLORS.bg,
                border: `1.5px solid ${COLORS.outline}`,
                borderRadius: 32,
                minHeight: 200,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.15 }}
            >
              {/* 아이콘 이미지 — 크기 조정: width/height 수정 */}
              <div className="relative" style={{ width: 48, height: 48 }}>
                <Image src={item.imageSrc} alt="" fill className="object-contain" />
              </div>
              <p
                className="font-ahn-bold text-[20px] lg:text-[26px] leading-snug whitespace-pre-line"
                style={{ color: COLORS.text }}
              >
                {item.title}
              </p>
              <p
                className="text-[15px] leading-relaxed whitespace-pre-line"
                style={{ color: COLORS.green }}
              >
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="font-ahn-medium text-[22px] lg:text-[28px] text-center mt-16"
          style={{ color: COLORS.text }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        >
          Rootmate와 함께라면, 처음 키우는 식물도 걱정 없어요!
        </motion.p>
      </div>
    </section>
  );
}
