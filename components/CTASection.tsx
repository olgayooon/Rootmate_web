'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { COLORS } from '@/constants/colors';

const kitItems = ['🌱 씨앗 봉투', '🪴 화분', '📱 앱 연동 코드'];

export default function CTASection() {
  return (
    <section
      id="shop"
      className="flex flex-col items-center justify-center text-center px-6 lg:px-8 py-[120px]"
      style={{ background: COLORS.green }}
    >
      <motion.h2
        className="font-ahn-bold text-[40px] md:text-[48px] lg:text-[56px] leading-tight"
        style={{ color: COLORS.bg }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        오늘, 첫 번째 씨앗을 심어요!
      </motion.h2>

      <motion.p
        className="text-[18px] lg:text-[20px] mt-6"
        style={{ color: COLORS.lime }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        하루 한 번, 식물과 내가 함께 자라는 경험
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <Link
          href="/shop"
          className="font-paperlogy-medium text-[20px] lg:text-[15px] px-10 py-4 transition-opacity hover:opacity-80 inline-block"
          style={{
            background: COLORS.lime,
            border: `1.5px solid ${COLORS.outline}`,
            borderRadius: 9999,
            color: COLORS.text,
          }}
        >
          키트 구매하기
        </Link>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-4 mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <p className="text-[15px] lg:text-[16px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
          앱 먼저 둘러보고 싶다면
        </p>
        <div className="flex gap-3">
          <Link
            href="#"
            className="flex items-center gap-2 px-6 py-3 text-[14px] font-paperlogy-medium transition-opacity hover:opacity-80"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              borderRadius: 12,
              color: COLORS.bg,
            }}
          >
            🍎 App Store
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-6 py-3 text-[14px] font-paperlogy-medium transition-opacity hover:opacity-80"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              borderRadius: 12,
              color: COLORS.bg,
            }}
          >
            ▶ Google Play
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
