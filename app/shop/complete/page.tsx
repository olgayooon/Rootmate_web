'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { COLORS } from '@/constants/colors';

const plantProfileSrc: Record<string, string> = {
  basil: '/images/characters/bajil_profile.png',
  tomato: '/images/characters/tom_profile.png',
  tulip: '/images/characters/tul_profile.png',
};

function CompleteContent() {
  const searchParams = useSearchParams();
  const plant = searchParams.get('plant') ?? 'basil';
  const profileSrc = plantProfileSrc[plant] ?? plantProfileSrc.basil;

  return (
    <motion.div
      className="flex flex-col items-center text-center px-6"
      style={{ maxWidth: 560, width: '100%' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* 캐릭터 이미지 bounce — 크기 조정: width/height 수정 */}
      <motion.div
        className="relative"
        style={{ width: 100, height: 100 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image src={profileSrc} alt="plant character" fill className="object-contain" />
      </motion.div>

      <h1
        className="font-ahn-bold text-[32px] lg:text-[36px] mt-8"
        style={{ color: COLORS.text }}
      >
        주문 신청이 완료됐어요
      </h1>

      <p
        className="text-[16px] lg:text-[18px] mt-4"
        style={{ color: COLORS.green }}
      >
        입력하신 이메일로 앱 연동 코드와 함께 안내드릴게요!
      </p>

      <div
        style={{
          height: 1,
          background: `${COLORS.outline}20`,
          width: '100%',
          margin: '32px 0',
        }}
      />

      {/* 배송 안내 카드 */}
      <div
        className="w-full flex flex-col gap-4 p-6 text-left"
        style={{
          background: COLORS.cardBg,
          border: `1.5px solid ${COLORS.outline}`,
          borderRadius: 24,
        }}
      >
        {[
          { icon: '🚚', text: '배송은 3~5 영업일 이내에 출발해요.' },
          { icon: '📱', text: '앱 연동 코드는 이메일로 별도 발송돼요.' },
          { icon: '📦', text: '구성품: 씨앗 봉투 · 화분 · 앱 연동 코드' },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-3">
            <span style={{ fontSize: 15, flexShrink: 0 }}>{icon}</span>
            <p className="text-[15px] lg:text-[15px]" style={{ color: COLORS.outline }}>
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Link
          href="/"
          className="font-ahn-bold text-[20px] lg:text-[20px] px-8 py-4 transition-opacity hover:opacity-80"
          style={{
            background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
            border: `1.5px solid ${COLORS.outline}`,
            borderRadius: 9999,
            color: COLORS.text,
          }}
        >
          홈으로 돌아가기
        </Link>
        <Link
          href="#"
          className="font-ahn-bold text-[20px] lg:text-[20px] px-8 py-4 transition-opacity hover:opacity-80"
          style={{
            background: COLORS.green,
            border: `1.5px solid ${COLORS.outline}`,
            borderRadius: 9999,
            color: '#FFFFFF',
          }}
        >
          앱 다운받기
        </Link>
      </div>
    </motion.div>
  );
}

export default function CompletePage() {
  return (
    <>
      <NavBar />
      <main
        className="flex-1 flex items-center justify-center pt-[72px]"
        style={{ minHeight: '100vh', background: COLORS.bg }}
      >
        <Suspense fallback={null}>
          <CompleteContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
