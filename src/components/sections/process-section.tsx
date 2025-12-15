"use client";

import { useI18n } from '@/hooks/use-i18n';
import { CountUp } from '../shared/count-up';
import { ScrollReveal } from '../shared/scroll-reveal';

export function ProcessSection() {
  const { t } = useI18n();

  const steps = [
    { num: 1, title: t('process.step1.title'), desc: t('process.step1.desc') },
    { num: 2, title: t('process.step2.title'), desc: t('process.step2.desc') },
    { num: 3, title: t('process.step3.title'), desc: t('process.step3.desc') },
    { num: 4, title: t('process.step4.title'), desc: t('process.step4.desc') },
  ];

  return (
    <section id="process" className="bg-white/5 py-16 md:py-24">
      <div className="container">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-extrabold md:text-5xl">
            {t('process.title')}
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 150}>
              <div className="flex flex-col gap-4 text-center lg:text-left rtl:lg:text-right md:flex-row lg:flex-col">
                 <div className="flex justify-center md:block">
                   <CountUp
                      num={step.num}
                      className="text-7xl font-extrabold text-gradient"
                    />
                 </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-secondary">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
