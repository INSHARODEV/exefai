"use client";

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';
import { ExefaiLogo } from '@/components/shared/exefai-logo';
import { ScrollReveal } from './shared/scroll-reveal';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '#what', label: t('nav.what') },
    { href: '#agents', label: t('nav.agents') },
    { href: '#build', label: t('nav.build') },
    { href: '#process', label: t('nav.process') },
  ];

  const socialLinks = [
    { href: '#', icon: Twitter },
    { href: '#', icon: Linkedin },
    { href: '#', icon: Facebook },
    { href: '#', icon: Instagram },
  ];

  return (
    <footer className="w-full bg-background text-secondary">
      <div className="container py-16">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-12 border-t border-border pt-12 md:grid-cols-3">
            <div className="flex flex-col items-start gap-4">
              <ExefaiLogo className="h-10 w-28" />
              <p className="text-sm">
                &copy; {year} {t('footer.copyright')}
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-center">
              <h3 className="font-semibold text-foreground">{t('footer.explore')}</h3>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <h3 className="font-semibold text-foreground">{t('footer.connect')}</h3>
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="rounded-full border border-border p-2 transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                    aria-label={`Follow on ${link.icon.displayName}`}
                  >
                    <link.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <Link href="#" className="transition-colors hover:text-foreground">{t('footer.privacy')}</Link>
                <Link href="#" className="transition-colors hover:text-foreground">{t('footer.contact')}</Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
