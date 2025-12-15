"use client";

import Link from 'next/link';
import { useI18n } from '@/hooks/use-i18n';
import { Button } from '@/components/ui/button';
import { ExefaiLogo } from '@/components/shared/exefai-logo';
import { ScrollReveal } from '../shared/scroll-reveal';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section
      id="hero-section"
      className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/hero1.gif"
          alt="Animated background"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        <ScrollReveal>
          <ExefaiLogo className="mx-auto h-16 w-48 md:h-20 md:w-60" />
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-7xl">
            {t('hero.headline')}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-secondary md:text-xl">
            {t('hero.subheading')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 w-full sm:w-auto transform bg-primary px-8 text-base font-semibold transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 hover:bg-gradient-to-r from-gradient-start to-gradient-end"
          >
            <Link href="#contact">{t('hero.cta.primary')}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className={cn(
              "h-12 w-full sm:w-auto transform border-2 border-foreground/50 bg-transparent px-8 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-foreground hover:bg-white/5 hover:shadow-2xl hover:shadow-white/10",
              "glass-surface"
              )}
          >
            <Link href="#what">{t('hero.cta.secondary')}</Link>
          </Button>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <p className="mx-auto mt-8 max-w-xl text-sm text-secondary">
            {t('hero.microcopy')}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
