'use client';

import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';

const steps = [
  {
    num: 1,
    icon: '🌱',
    title: '식물 키우기 시작',
    desc: '실제 씨앗 키트를 받아 직접 심고 가꿔요.\n물을 주고, 햇빛을 쬐어주는 것부터 시작해요.',
  },
  {
    num: 2,
    icon: '✨',
    title: '내 식물이 폰으로 쏙!',
    desc: 'AI가 내 식물을 귀여운 캐릭터로 변환해요.\n식물이 자랄수록 캐릭터도 함께 성장해요.',
  },
  {
    num: 3,
    icon: '💬',
    title: '식물이 나에게 말을 걸어요',
    desc: '매일 하나의 말을 건네요.\n오늘 밥은 먹었는지, 잠은 잘 잤는지.',
  },
];

export default function HowItWorksSection() {
  return (
    <section style={{ padding: '100px 0', background: COLORS.bg }}>
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
          어떻게 작동하나요?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative flex flex-col p-8 lg:p-10"
              style={{
                background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
                border: `1.5px solid ${COLORS.outline}`,
                borderRadius: 32,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.2 }}
            >
              {/* 번호 뱃지 */}
              <div
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center font-paperlogy-medium text-[14px]"
                style={{
                  border: `1.5px solid ${COLORS.outline}`,
                  borderRadius: 9999,
                  background: COLORS.bg,
                  color: COLORS.text,
                }}
              >
                {step.num}
              </div>

              <h3
                className="font-ahn-bold text-[22px] lg:text-[26px] mt-6 mb-4"
                style={{ color: COLORS.text }}
              >
                {step.title}
              </h3>

              <p
                className="text-[15px] lg:text-[15px] leading-relaxed whitespace-pre-line"
                style={{ color: COLORS.green }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
