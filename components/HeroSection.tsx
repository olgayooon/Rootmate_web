'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex items-center pt-[72px]"
      style={{ minHeight: '100vh', background: COLORS.bg }}
    >
      <div
        className="w-full mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-[100px] pb-[80px]"
        style={{ maxWidth: 1200 }}
      >
        {/* 좌측 텍스트 */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1
            className="font-ahn-bold leading-[1.15] whitespace-pre-line text-[48px] md:text-[60px] lg:text-[72px]"
            style={{ color: COLORS.text }}
          >
            {"Rootmate"}
          </h1>

          <p
            className="font-ahn-medium leading-[1.3] whitespace-pre-line text-[20px] lg:text-[30px] mt-6"
            style={{ color: COLORS.green }}
          >
            식물이 자라면 나도 자란다!<br></br>씨앗 하나로 시작하는 나만의 루틴
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/shop"
              className="font-paperlogy-medium text-[16px] lg:text-[17px] px-10 py-4 transition-opacity hover:opacity-80"
              style={{
                background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
                border: `1.5px solid ${COLORS.outline}`,
                borderRadius: 9999,
                color: COLORS.text,
              }}
            >
              키트 구매하기
            </Link>
            {/* 나의 룻메이트 선택하기 — #plants 섹션으로 스크롤 */}
            <button
              onClick={scrollToAbout}
              className="font-paperlogy-medium text-[16px] lg:text-[17px] px-10 py-4 transition-opacity hover:opacity-80"
              style={{
                background: COLORS.bg,
                border: `1.5px solid ${COLORS.outline}`,
                borderRadius: 9999,
                color: COLORS.text,
                cursor: 'pointer',
              }}
            >
              나의 룻메이트 선택하기
            </button>
          </div>
        </motion.div>

        {/* 우측 목업 */}
        <motion.div
          className="w-full lg:flex-1 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          {/* 앱 화면 목업 자리 — 실제 이미지로 교체 시 src 변경 */}
          <div
            className="relative mx-auto w-full"
            style={{ maxWidth: 300 }}
          >
            <div
              style={{
                background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
                border: `2px solid ${COLORS.outline}`,
                borderRadius: 30,
                aspectRatio: '390 / 844',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/images/home-mockup.png"
                alt="Rootmate 앱 화면"
                fill
                className="object-cover"
                style={{ borderRadius: 30 }}
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 스크롤 다운 화살표 */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 flex flex-col items-center gap-1"
        style={{ transform: 'translateX(-50%)', cursor: 'pointer', background: 'none', border: 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-label="아래로 스크롤"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="35" height="35" viewBox="0 0 28 28" fill="none">
            <path
              d="M6 10L14 18L22 10"
              stroke={COLORS.green}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}
