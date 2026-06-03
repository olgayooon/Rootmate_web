'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import StepIndicator from '@/components/shop/StepIndicator';
import Step1PlantSelect from '@/components/shop/Step1PlantSelect';
import Step2Options from '@/components/shop/Step2Options';
import Step3OrderForm from '@/components/shop/Step3OrderForm';
import OrderSummary from '@/components/shop/OrderSummary';
import { COLORS } from '@/constants/colors';

interface OrderState {
  step: 1 | 2 | 3;
  plant: 'basil' | 'tomato' | 'tulip' | null;
  quantity: number;
  isGift: boolean;
  giftMessage: string;
  giftRecipientName: string;
  orderer: { name: string; phone: string; email: string };
  delivery: { name: string; phone: string; address: string; addressDetail: string };
  agreements: { privacy: boolean; purchase: boolean; marketing: boolean };
}

const initialState: OrderState = {
  step: 1,
  plant: null,
  quantity: 1,
  isGift: false,
  giftMessage: '',
  giftRecipientName: '',
  orderer: { name: '', phone: '', email: '' },
  delivery: { name: '', phone: '', address: '', addressDetail: '' },
  agreements: { privacy: false, purchase: false, marketing: false },
};


export default function ShopPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderState>(initialState);

  const update = (patch: Partial<OrderState>) => setOrder((p) => ({ ...p, ...patch }));

  const handleSubmit = () => {
    router.push(`/shop/complete?plant=${order.plant ?? 'basil'}`);
  };

  const stepContent = (
    <AnimatePresence mode="wait">
      {order.step === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Step1PlantSelect
            selectedPlant={order.plant}
            onSelect={(id) => update({ plant: id })}
            onNext={() => update({ step: 2 })}
          />
        </motion.div>
      )}

      {order.step === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col lg:flex-row gap-8 items-start"
        >
          <div className="flex-1 min-w-0">
            <Step2Options
              quantity={order.quantity}
              isGift={order.isGift}
              giftMessage={order.giftMessage}
              giftRecipientName={order.giftRecipientName}
              onQuantityChange={(q) => update({ quantity: q })}
              onGiftToggle={(v) => update({ isGift: v })}
              onGiftMessageChange={(v) => update({ giftMessage: v })}
              onGiftRecipientChange={(v) => update({ giftRecipientName: v })}
              onNext={() => update({ step: 3 })}
              onBack={() => update({ step: 1 })}
            />
          </div>
          <div className="w-full lg:w-80 flex-shrink-0">
            <OrderSummary
              plant={order.plant}
              quantity={order.quantity}
              isGift={order.isGift}
              step={2}
            />
          </div>
        </motion.div>
      )}

      {order.step === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col lg:flex-row gap-8 items-start"
        >
          <div className="flex-1 min-w-0">
            <Step3OrderForm
              orderer={order.orderer}
              delivery={order.delivery}
              agreements={order.agreements}
              isGift={order.isGift}
              giftRecipientName={order.giftRecipientName}
              onOrdererChange={(v) => update({ orderer: v })}
              onDeliveryChange={(v) => update({ delivery: v })}
              onAgreementsChange={(v) => update({ agreements: v })}
              onSubmit={handleSubmit}
              onBack={() => update({ step: 2 })}
            />
          </div>
          <div className="w-full lg:w-80 flex-shrink-0">
            <OrderSummary
              plant={order.plant}
              quantity={order.quantity}
              isGift={order.isGift}
              step={3}
              onSubmit={handleSubmit}
              isSubmitValid={
                !!(
                  order.orderer.name.trim() &&
                  /^010-\d{4}-\d{4}$/.test(order.orderer.phone) &&
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.orderer.email) &&
                  order.delivery.name.trim() &&
                  /^010-\d{4}-\d{4}$/.test(order.delivery.phone) &&
                  order.delivery.address.trim() &&
                  order.agreements.privacy &&
                  order.agreements.purchase
                )
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <NavBar />

      <main
        className="flex-1 pt-[72px]"
        style={{ background: COLORS.cardBg, minHeight: '100vh' }}
      >
        {/* 페이지 헤더 */}
        <div
          style={{
            background: COLORS.bg,
            borderBottom: `1.5px solid ${COLORS.outline}`,
            padding: '48px 0 40px',
          }}
        >
          <div className="mx-auto px-6 lg:px-8 flex flex-col items-center gap-6" style={{ maxWidth: 1200 }}>
            <div className="text-center">
              <h1 className="font-ahn-bold text-[32px] lg:text-[40px]" style={{ color: COLORS.text }}>
                씨앗 키트 주문하기
              </h1>
              <p className="text-[16px] mt-3" style={{ color: COLORS.green }}>
                식물을 선택하고, 나만의 룸메이트를 만나요
              </p>
            </div>
            <StepIndicator currentStep={order.step} />
          </div>
        </div>

        {/* 단계별 컨텐츠 */}
        <div
          className="mx-auto px-6 lg:px-8 py-12"
          style={{ maxWidth: 1200 }}
        >
          {stepContent}
        </div>
      </main>

      <Footer />
    </>
  );
}
