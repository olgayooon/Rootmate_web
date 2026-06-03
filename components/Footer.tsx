import Link from 'next/link';
import { COLORS } from '@/constants/colors';

export default function Footer() {
  return (
    <footer
      style={{
        background: COLORS.cardBg,
        borderTop: `1.5px solid ${COLORS.outline}`,
        padding: '64px 0 40px',
      }}
    >
      <div
        className="mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12"
        style={{ maxWidth: 1200 }}
      >
        {/* 로고 + 설명 */}
        <div className="flex flex-col gap-3">
          <span className="font-ahn-bold text-[25px]" style={{ color: COLORS.text }}>
            Rootmate
          </span>
          <p className="text-[14px] mt-1" style={{ color: '#6b7560' }}>
            식물이 자라면 나도 자란다!<br></br>씨앗 하나로 시작하는 나만의 루틴
          </p>
        </div>

        {/* 앱 링크 */}
        <div className="flex flex-col gap-3">
          <span className="font-paperlogy-medium text-[13px] uppercase tracking-widest mb-1" style={{ color: COLORS.outline }}>
            앱 다운로드
          </span>
          <Link href="#" className="text-[14px] transition-opacity hover:opacity-60" style={{ color: COLORS.text }}>
            🍎 App Store
          </Link>
          <Link href="#" className="text-[14px] transition-opacity hover:opacity-60" style={{ color: COLORS.text }}>
            ▶ Google Play
          </Link>
        </div>

        {/* 소셜 */}
        <div className="flex flex-col gap-3">
          <span className="font-paperlogy-medium text-[13px] uppercase tracking-widest mb-1" style={{ color: COLORS.outline }}>
            소셜
          </span>
          <Link href="#" className="text-[14px] transition-opacity hover:opacity-60" style={{ color: COLORS.text }}>
            📸 Instagram
          </Link>
          <Link href="#" className="text-[14px] transition-opacity hover:opacity-60" style={{ color: COLORS.text }}>
            문의하기
          </Link>
        </div>
      </div>

      <div
        className="mx-auto px-6 lg:px-8 mt-12 pt-6"
        style={{ maxWidth: 1200, borderTop: `1px solid rgba(48,58,30,0.2)` }}
      >
        <p className="text-[13px]" style={{ color: COLORS.green }}>
          © 2026 Rootmate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
