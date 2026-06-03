'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';

export default function GiftSection() {
  return (
    <section style={{ background: COLORS.cardBg, padding: '100px 0' }}>
      <div
        className="mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16"
        style={{ maxWidth: 1200 }}
      >
        {/* 좌측 텍스트 */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-medium text-[18px]" style={{ color: COLORS.green }}>
            요즘 휴식이 필요해 보이는 친구에게
          </p>
          <h2
            className="font-ahn-bold text-[36px] lg:text-[48px] leading-[1.2] whitespace-pre-line mt-4"
            style={{ color: COLORS.text }}
          >
            {"식물로 마음을 전하는 것 어떠신가요?"}
          </h2>
          <p
            className="font-medium text-[16px] lg:text-[18px] leading-relaxed whitespace-pre-line mt-6"
            style={{ color: COLORS.green }}
          >
            {"씨앗 키트와 함께 손편지를 동봉할 수 있어요!"}
          </p>
          <Link
            href="/shop"
            className="font-paperlogy-medium self-start text-[16px] px-8 py-4 transition-opacity hover:opacity-80 mt-10"
            style={{
              background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
              border: `1.5px solid ${COLORS.outline}`,
              borderRadius: 9999,
              color: COLORS.text,
            }}
          >
            선물하기 →
          </Link>
        </motion.div>

        {/* 우측 선물 카드 목업 */}
        <motion.div
          className="flex-1 flex justify-center w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          {/* 선물 일러스트 교체 시: 이 div를 Image 컴포넌트로 교체 */}
          <div
            className="w-full flex flex-col gap-5 p-10 lg:p-12"
            style={{
              maxWidth: 480,
              background: COLORS.bg,
              border: `1.5px solid ${COLORS.outline}`,
              borderRadius: 32,
            }}
          >
            {/* 이미지 크기 조정: width/height 수정 */}
            <div className="relative" style={{ width: 70, height: 70 }}>
              <Image src="/images/letter.png" alt="letter" fill className="object-contain" />
            </div>
            <h3
              className="font-ahn-bold text-[23px] lg:text-[25px]"
              style={{ color: COLORS.text }}
            >
              룻메이트를 선물해요
            </h3>
            <div className="flex flex-col gap-3">
              {['🌱 씨앗 봉투', '🪴 화분 & 흙', '📱 앱 연동 코드', '💌 메시지 카드'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 px-4 py-3 text-[15px] lg:text-[15px]"
                  style={{
                    background: COLORS.cardBg,
                    border: `1.5px solid ${COLORS.outline}`,
                    borderRadius: 16,
                    color: COLORS.text,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
