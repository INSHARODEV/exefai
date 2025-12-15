"use client";

import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/sections/hero-section';
import { WhatSection } from '@/components/sections/what-section';
import { AgentsSection } from '@/components/sections/agents-section';
import { BuildSection } from '@/components/sections/build-section';
import { ProcessSection } from '@/components/sections/process-section';
import { PhilosophySection } from '@/components/sections/philosophy-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => sectionObserver.unobserve(section));
    };
  }, []);

  return (
    <>
      <Header isVisible={isHeaderVisible} activeSection={activeSection} />
      <main className="flex w-full flex-col overflow-x-hidden">
        <div id="hero">
          <HeroSection />
        </div>
        <WhatSection />
        <AgentsSection />
        <BuildSection />
        <ProcessSection />
        <PhilosophySection />
        <Footer />
      </main>
    </>
  );
}
