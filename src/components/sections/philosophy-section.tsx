"use client";

import { useI18n } from '@/hooks/use-i18n';
import { DiamondBullet } from '../shared/diamond-bullet';
import { ScrollReveal } from '../shared/scroll-reveal';

export function PhilosophySection() {
  const { t } = useI18n();

  const benefits = [
    t('philosophy.benefits.item1'),
    t('philosophy.benefits.item2'),
    t('philosophy.benefits.item3'),
  ];

  return (
    <section id="philosophy" className="container py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 lg:gap-24">
        <ScrollReveal className="md:col-span-6">
          <h2 className="text-3xl font-extrabold md:text-5xl">
            {t('philosophy.title')}
          </h2>
          <p className="mt-6 text-lg text-secondary">
            {t('philosophy.copy')}
          </p>
        </ScrollReveal>
        <ScrollReveal className="md:col-span-6" delay={100}>
          <div className="glass-surface h-full rounded-xl border border-border p-8">
            <h3 className="mb-6 font-semibold text-foreground">
              {t('philosophy.benefits_title')}
            </h3>
            <ul className="space-y-4">
              {benefits.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <DiamondBullet className="mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
