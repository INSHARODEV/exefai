"use client";

import { useI18n } from '@/hooks/use-i18n';
import { DiamondBullet } from '../shared/diamond-bullet';
import { ScrollReveal } from '../shared/scroll-reveal';

export function BuildSection() {
  const { t } = useI18n();

  const bestFor = [
    t('build.left_list.item1'),
    t('build.left_list.item2'),
    t('build.left_list.item3'),
    t('build.left_list.item4'),
  ];
  const examples = [
    t('build.right_list.item1'),
    t('build.right_list.item2'),
    t('build.right_list.item3'),
    t('build.right_list.item4'),
    t('build.right_list.item5'),
  ];

  return (
    <section id="build" className="container py-16 md:py-24">
      <ScrollReveal>
        <h2 className="text-3xl font-extrabold md:text-5xl">
          {t('build.title')}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-secondary">
          {t('build.intro')}
        </p>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <ScrollReveal delay={100}>
          <div className="glass-surface h-full rounded-xl border border-border p-8">
            <h3 className="mb-6 font-semibold text-foreground">
              {t('build.left_title')}
            </h3>
            <ul className="space-y-4">
              {bestFor.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <DiamondBullet className="mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="glass-surface h-full rounded-xl border border-border p-8">
            <h3 className="mb-6 font-semibold text-foreground">
              {t('build.right_title')}
            </h3>
            <ul className="space-y-4">
              {examples.map((item, i) => (
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
