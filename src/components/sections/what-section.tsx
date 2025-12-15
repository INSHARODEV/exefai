"use client";

import Link from 'next/link';
import { useI18n } from '@/hooks/use-i18n';
import { DiamondBullet } from '../shared/diamond-bullet';
import { ScrollReveal } from '../shared/scroll-reveal';
import { Button } from '@/components/ui/button';

export function WhatSection() {
  const { t } = useI18n();

  const bullets = [
    t('what.bullet1'),
    t('what.bullet2'),
    t('what.bullet3'),
  ];

  return (
    <section id="what" className="container py-16 md:py-32">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16 lg:gap-24">
        <ScrollReveal className="md:col-span-6">
          <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
            {t('what.title')}
          </h2>
          <p className="mt-6 text-lg text-secondary">
            {t('what.copy')}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 transform bg-primary px-8 text-base font-semibold transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 hover:bg-gradient-to-r from-gradient-start to-gradient-end"
          >
            <Link href="#build">{t('what.cta')}</Link>
          </Button>
        </ScrollReveal>
        <ScrollReveal className="md:col-span-6" delay={100}>
          <div className="glass-surface rounded-xl border border-border p-8">
            <ul className="space-y-4">
              {bullets.map((bullet, i) => (
                <ScrollReveal key={i} delay={100 + i * 100} className="flex items-start gap-4">
                  <DiamondBullet className="mt-1.5 transition-transform duration-500 ease-out group-[.is-visible]:rotate-45" />
                  <span>{bullet}</span>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
