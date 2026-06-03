'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { COLORS } from '@/constants/colors';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1.5px solid ${COLORS.outline}`,
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        height: 72,
      }}
    >
      <div
        className="flex items-center justify-between h-full px-6 lg:px-8 mx-auto"
        style={{ maxWidth: 1200 }}
      >
        <Link
          href="/"
          className="font-ahn-bold text-[28px]"
          style={{ color: COLORS.text }}
        >
          Rootmate
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link href="#about" className="text-[16px] transition-opacity hover:opacity-60" style={{ color: COLORS.text }}>소개</Link>
          <Link href="#plants" className="text-[16px] transition-opacity hover:opacity-60" style={{ color: COLORS.text }}>식물</Link>
          <Link href="#shop" className="text-[16px] transition-opacity hover:opacity-60" style={{ color: COLORS.text }}>구매</Link>
          <Link
            href="/shop"
            className="font-paperlogy-medium text-[15px] px-7 py-2.5 transition-opacity hover:opacity-80"
            style={{
              background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
              border: `1.5px solid ${COLORS.outline}`,
              borderRadius: 9999,
              color: COLORS.text,
            }}
          >
            키트 구매하기
          </Link>
        </div>

        <Link
          href="/shop"
          className="md:hidden font-paperlogy-medium px-5 py-2 text-[13px]"
          style={{
            background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
            border: `1.5px solid ${COLORS.outline}`,
            borderRadius: 9999,
            color: COLORS.text,
          }}
        >
          구매하기
        </Link>
      </div>
    </nav>
  );
}
