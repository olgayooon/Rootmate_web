'use client';

import { useState } from 'react';
import { COLORS } from '@/constants/colors';

interface Orderer {
  name: string;
  phone: string;
  email: string;
}

interface Delivery {
  name: string;
  phone: string;
  address: string;
  addressDetail: string;
}

interface Agreements {
  privacy: boolean;
  purchase: boolean;
  marketing: boolean;
}

interface Step3Props {
  orderer: Orderer;
  delivery: Delivery;
  agreements: Agreements;
  isGift: boolean;
  giftRecipientName: string;
  onOrdererChange: (v: Orderer) => void;
  onDeliveryChange: (v: Delivery) => void;
  onAgreementsChange: (v: Agreements) => void;
  onSubmit: () => void;
  onBack: () => void;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function isValidPhone(phone: string): boolean {
  return /^010-\d{4}-\d{4}$/.test(phone);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const labelStyle = { fontSize: 14, color: COLORS.outline, fontFamily: 'inherit' };

export default function Step3OrderForm({
  orderer,
  delivery,
  agreements,
  isGift,
  giftRecipientName,
  onOrdererChange,
  onDeliveryChange,
  onAgreementsChange,
  onSubmit,
  onBack,
}: Step3Props) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sameAsOrderer, setSameAsOrderer] = useState(false);

  const touch = (key: string) => setTouched((p) => ({ ...p, [key]: true }));

  const handleSameAsOrdererToggle = (checked: boolean) => {
    setSameAsOrderer(checked);
    if (checked) {
      onDeliveryChange({
        ...delivery,
        name: orderer.name,
        phone: orderer.phone,
      });
    }
  };

  const errors: Record<string, string> = {};
  if (touched['orderer.name'] && !orderer.name.trim()) errors['orderer.name'] = '이름을 입력해주세요';
  if (touched['orderer.phone'] && !isValidPhone(orderer.phone)) errors['orderer.phone'] = '010-XXXX-XXXX 형식으로 입력해주세요';
  if (touched['orderer.email'] && !isValidEmail(orderer.email)) errors['orderer.email'] = '올바른 이메일을 입력해주세요';
  if (touched['delivery.name'] && !delivery.name.trim()) errors['delivery.name'] = '받는 분 이름을 입력해주세요';
  if (touched['delivery.phone'] && !isValidPhone(delivery.phone)) errors['delivery.phone'] = '010-XXXX-XXXX 형식으로 입력해주세요';
  if (touched['delivery.address'] && !delivery.address.trim()) errors['delivery.address'] = '주소를 입력해주세요';

  const isValid =
    orderer.name.trim() &&
    isValidPhone(orderer.phone) &&
    isValidEmail(orderer.email) &&
    delivery.name.trim() &&
    isValidPhone(delivery.phone) &&
    delivery.address.trim() &&
    agreements.privacy &&
    agreements.purchase;

  const inputStyle = (key: string): React.CSSProperties => ({
    border: `1.5px solid ${errors[key] ? COLORS.red : COLORS.outline}`,
    borderRadius: 12,
    padding: '14px 16px',
    fontSize: 15,
    color: COLORS.text,
    background: COLORS.bg,
    width: '100%',
    outline: 'none',
    fontFamily: 'inherit',
  });

  return (
    <div className="flex flex-col gap-8">

      {/* 주문자 정보 */}
      <section
        className="flex flex-col gap-5 p-8"
        style={{ background: COLORS.bg, border: `1.5px solid ${COLORS.outline}`, borderRadius: 24 }}
      >
        <h3 className="font-ahn-bold text-[25px]" style={{ color: COLORS.text }}>주문자 정보</h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-paperlogy-medium" style={labelStyle}>
              이름 <span style={{ color: COLORS.red }}>*</span>
            </label>
            <input
              type="text"
              value={orderer.name}
              onChange={(e) => onOrdererChange({ ...orderer, name: e.target.value })}
              onBlur={() => touch('orderer.name')}
              placeholder="홍길동"
              className="shop-input"
              style={inputStyle('orderer.name')}
            />
            {errors['orderer.name'] && (
              <span className="text-[12px]" style={{ color: COLORS.red }}>{errors['orderer.name']}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-paperlogy-medium" style={labelStyle}>
              연락처 <span style={{ color: COLORS.red }}>*</span>
            </label>
            <input
              type="tel"
              value={orderer.phone}
              onChange={(e) => onOrdererChange({ ...orderer, phone: formatPhone(e.target.value) })}
              onBlur={() => touch('orderer.phone')}
              placeholder="010-0000-0000"
              className="shop-input"
              style={inputStyle('orderer.phone')}
            />
            {errors['orderer.phone'] && (
              <span className="text-[12px]" style={{ color: COLORS.red }}>{errors['orderer.phone']}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-paperlogy-medium" style={labelStyle}>
              이메일 <span style={{ color: COLORS.red }}>*</span>
            </label>
            <input
              type="email"
              value={orderer.email}
              onChange={(e) => onOrdererChange({ ...orderer, email: e.target.value })}
              onBlur={() => touch('orderer.email')}
              placeholder="hello@example.com"
              className="shop-input"
              style={inputStyle('orderer.email')}
            />
            <span className="text-[13px]" style={{ color: '#6b7560' }}>앱 연동 코드가 이 이메일로 발송돼요</span>
            {errors['orderer.email'] && (
              <span className="text-[12px]" style={{ color: COLORS.red }}>{errors['orderer.email']}</span>
            )}
          </div>
        </div>
      </section>

      {/* 배송지 정보 */}
      <section
        className="flex flex-col gap-5 p-8"
        style={{ background: COLORS.bg, border: `1.5px solid ${COLORS.outline}`, borderRadius: 24 }}
      >
        {/* 헤더 + 주문자 동일 토글 */}
        <div className="flex items-center justify-between">
          <h3 className="font-ahn-bold text-[25px]" style={{ color: COLORS.text }}>배송지 정보</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center transition-all duration-200"
              style={{
                border: `1.5px solid ${sameAsOrderer ? COLORS.green : COLORS.outline}`,
                borderRadius: 6,
                background: sameAsOrderer ? COLORS.green : COLORS.bg,
                color: '#FFFFFF',
                fontSize: 12,
                cursor: 'pointer',
              }}
              onClick={() => handleSameAsOrdererToggle(!sameAsOrderer)}
            >
              {sameAsOrderer && '✓'}
            </div>
            <span
              className="font-paperlogy-medium text-[13px]"
              style={{ color: COLORS.outline }}
              onClick={() => handleSameAsOrdererToggle(!sameAsOrderer)}
            >
              주문자 정보와 동일
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-4">
          {/* 받는 분 이름 */}
          <div className="flex flex-col gap-1.5">
            <label className="font-paperlogy-medium" style={labelStyle}>
              받는 분 이름 <span style={{ color: COLORS.red }}>*</span>
            </label>
            <input
              type="text"
              value={delivery.name}
              onChange={(e) => onDeliveryChange({ ...delivery, name: e.target.value })}
              onBlur={() => touch('delivery.name')}
              placeholder={isGift && giftRecipientName ? giftRecipientName : '받는 분 이름'}
              className="shop-input"
              style={{
                ...inputStyle('delivery.name'),
                background: sameAsOrderer ? COLORS.cardBg : COLORS.bg,
              }}
              readOnly={sameAsOrderer}
            />
            {errors['delivery.name'] && (
              <span className="text-[12px]" style={{ color: COLORS.red }}>{errors['delivery.name']}</span>
            )}
          </div>

          {/* 받는 분 연락처 */}
          <div className="flex flex-col gap-1.5">
            <label className="font-paperlogy-medium" style={labelStyle}>
              받는 분 연락처 <span style={{ color: COLORS.red }}>*</span>
            </label>
            <input
              type="tel"
              value={delivery.phone}
              onChange={(e) => onDeliveryChange({ ...delivery, phone: formatPhone(e.target.value) })}
              onBlur={() => touch('delivery.phone')}
              placeholder="010-0000-0000"
              className="shop-input"
              style={{
                ...inputStyle('delivery.phone'),
                background: sameAsOrderer ? COLORS.cardBg : COLORS.bg,
              }}
              readOnly={sameAsOrderer}
            />
            {errors['delivery.phone'] && (
              <span className="text-[12px]" style={{ color: COLORS.red }}>{errors['delivery.phone']}</span>
            )}
          </div>

          {/* 주소 */}
          <div className="flex flex-col gap-1.5">
            <label className="font-paperlogy-medium" style={labelStyle}>
              주소 <span style={{ color: COLORS.red }}>*</span>
            </label>
            <input
              type="text"
              value={delivery.address}
              onChange={(e) => onDeliveryChange({ ...delivery, address: e.target.value })}
              onBlur={() => touch('delivery.address')}
              placeholder="주소를 입력하세요"
              className="shop-input"
              style={inputStyle('delivery.address')}
            />
            {errors['delivery.address'] && (
              <span className="text-[12px]" style={{ color: COLORS.red }}>{errors['delivery.address']}</span>
            )}
          </div>

          {/* 상세 주소 */}
          <div className="flex flex-col gap-1.5">
            <label className="font-paperlogy-medium" style={labelStyle}>상세 주소</label>
            <input
              type="text"
              value={delivery.addressDetail}
              onChange={(e) => onDeliveryChange({ ...delivery, addressDetail: e.target.value })}
              placeholder="동/호수, 건물명 등"
              className="shop-input"
              style={inputStyle('')}
            />
          </div>
        </div>
      </section>

      {/* 동의 항목 */}
      <section
        className="flex flex-col gap-4 p-8"
        style={{ background: COLORS.bg, border: `1.5px solid ${COLORS.outline}`, borderRadius: 24 }}
      >
        <h3 className="font-ahn-bold text-[25px]" style={{ color: COLORS.text }}>동의 항목</h3>

        {[
          { key: 'privacy', label: '(필수) 개인정보 수집 및 이용 동의' },
          { key: 'purchase', label: '(필수) 구매 조건 확인 및 결제 진행 동의' },
          { key: 'marketing', label: '(선택) 마케팅 정보 수신 동의' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-3 cursor-pointer" style={{ color: COLORS.text }}>
            <div
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center transition-all duration-200"
              style={{
                border: `1.5px solid ${agreements[key as keyof Agreements] ? COLORS.green : COLORS.outline}`,
                borderRadius: 6,
                background: agreements[key as keyof Agreements] ? COLORS.green : COLORS.bg,
                color: '#FFFFFF',
                fontSize: 12,
                cursor: 'pointer',
              }}
              onClick={() => onAgreementsChange({ ...agreements, [key]: !agreements[key as keyof Agreements] })}
            >
              {agreements[key as keyof Agreements] && '✓'}
            </div>
            <span className="text-[14px]">{label}</span>
          </label>
        ))}
      </section>

      {/* 주문하기 버튼 */}
      <button
        onClick={isValid ? onSubmit : undefined}
        className="font-ahn-bold text-[18px] w-full py-5 transition-opacity"
        style={{
          background: `linear-gradient(to bottom, ${COLORS.cardBg}, ${COLORS.lime})`,
          border: `1.5px solid ${COLORS.outline}`,
          borderRadius: 9999,
          color: COLORS.text,
          opacity: isValid ? 1 : 0.4,
          cursor: isValid ? 'pointer' : 'not-allowed',
        }}
      >
        주문하기
      </button>

      <button
        onClick={onBack}
        className="font-paperlogy-medium text-[16px] self-start px-8 py-3 transition-opacity hover:opacity-70"
        style={{
          background: COLORS.bg,
          border: `1.5px solid ${COLORS.outline}`,
          borderRadius: 9999,
          color: COLORS.text,
          cursor: 'pointer',
        }}
      >
        ← 이전
      </button>
    </div>
  );
}
