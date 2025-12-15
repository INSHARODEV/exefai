"use client";

import Link from 'next/link';
import { Menu, X, Languages } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/use-i18n';
import { Button } from '@/components/ui/button';
import { ExefaiLogo } from '@/components/shared/exefai-logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

interface HeaderProps {
  isVisible: boolean;
  activeSection: string;
}

export function Header({ isVisible, activeSection }: HeaderProps) {
  const { t, locale, setLocale } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#what', label: t('nav.what') },
    { href: '#agents', label: t('nav.agents') },
    { href: '#build', label: t('nav.build') },
    { href: '#process', label: t('nav.process') },
    { href: '#philosophy', label: t('nav.philosophy') },
  ];

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  const NavLinkItems = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            className={cn(
              "relative text-sm font-medium transition-colors hover:text-foreground",
              activeSection === link.href.substring(1) ? "text-foreground" : "text-secondary-foreground/70",
              isMobile ? "block py-3 text-lg" : ""
            )}
          >
            {link.label}
            {activeSection === link.href.substring(1) && !isMobile && (
              <span className="absolute -bottom-2 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary"></span>
            )}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ease-in-out",
        "before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-gradient-start before:to-gradient-end before:opacity-0 before:transition-opacity",
        isVisible
          ? "translate-y-0 opacity-100 before:opacity-100 shadow-2xl shadow-black/50"
          : "-translate-y-full opacity-0",
        "glass-surface"
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link href="#hero" aria-label={t('nav.home')}>
          <ExefaiLogo className="h-10 w-28" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">{NavLinkItems({ isMobile: false })}</ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLocale}
            className="h-9 w-9 text-secondary-foreground/70 hover:bg-white/10 hover:text-foreground"
            aria-label={t('nav.toggle_language')}
          >
            <Languages className="h-5 w-5" />
          </Button>
          <Button
            asChild
            className="hidden h-9 transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg lg:flex bg-primary hover:bg-gradient-to-r from-gradient-start to-gradient-end"
          >
            <Link href="#contact">{t('nav.cta')}</Link>
          </Button>

          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-secondary-foreground/70 hover:bg-white/10 hover:text-foreground">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t('nav.open_menu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={locale === 'ar' ? 'right' : 'left'} className="w-[80vw] glass-surface border-border p-0">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b border-border p-5">
                    <ExefaiLogo className="h-10 w-28" />
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">{t('nav.close_menu')}</span>
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex-1 p-8">
                    <ul className="flex flex-col gap-6">
                      <NavLinkItems isMobile={true} />
                    </ul>
                  </nav>
                  <div className="border-t border-border p-5">
                     <Button
                        asChild
                        className="w-full h-12 bg-primary hover:bg-gradient-to-r from-gradient-start to-gradient-end"
                      >
                        <Link href="#contact">{t('nav.cta')}</Link>
                      </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
