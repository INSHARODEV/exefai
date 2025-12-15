"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/use-i18n';
import { DiamondBullet } from '../shared/diamond-bullet';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ScrollReveal } from '../shared/scroll-reveal';

type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  points: string[];
  result: string;
};

export function AgentsSection() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const cardAreaRef = useRef<HTMLDivElement>(null);
  const isThrottled = useRef(false);

  const agents: Agent[] = [
    {
      id: 'ameen',
      name: t('agents.ameen.name'),
      role: t('agents.ameen.role'),
      description: t('agents.ameen.description'),
      points: [t('agents.ameen.point1'), t('agents.ameen.point2')],
      result: t('agents.ameen.result'),
    },
    {
      id: 'mueen',
      name: t('agents.mueen.name'),
      role: t('agents.mueen.role'),
      description: t('agents.mueen.description'),
      points: [t('agents.mueen.point1'), t('agents.mueen.point2')],
      result: t('agents.mueen.result'),
    },
    {
      id: 'hadi',
      name: t('agents.hadi.name'),
      role: t('agents.hadi.role'),
      description: t('agents.hadi.description'),
      points: [t('agents.hadi.point1'), t('agents.hadi.point2')],
      result: t('agents.hadi.result'),
    },
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!cardAreaRef.current) return;
      const rect = cardAreaRef.current.getBoundingClientRect();
      const isCardAreaInView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;

      if (isCardAreaInView) {
        document.body.style.overflow = 'hidden';

        if (isThrottled.current) {
          e.preventDefault();
          return;
        }

        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;
        let shouldPreventDefault = false;

        if (isScrollingDown) {
          if (activeIndex < agents.length - 1) {
            setActiveIndex((prev) => prev + 1);
            shouldPreventDefault = true;
          } else {
            document.body.style.overflow = '';
          }
        } else if (isScrollingUp) {
          if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
            shouldPreventDefault = true;
          } else {
            document.body.style.overflow = '';
          }
        }

        if (shouldPreventDefault) {
          e.preventDefault();
          isThrottled.current = true;
          setTimeout(() => {
            isThrottled.current = false;
          }, 800); // Cooldown period in milliseconds
        }
      } else {
        document.body.style.overflow = '';
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.body.style.overflow = ''; // Ensure unlock on component unmount
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, agents.length]);


  const cardTransforms = agents.map((_, i) => {
    const isBeforeActive = i < activeIndex;
    const isAfterActive = i > activeIndex;

    let y = 0;
    let scale = 1;
    let rotate = 0;
    let opacity = 1;

    if (isBeforeActive) {
      const offset = activeIndex - i;
      y = -offset * 30;
      scale = 1 - offset * 0.05;
      opacity = 0;
    } else if (isAfterActive) {
      const offset = i - activeIndex;
      y = offset * 20;
      scale = 1 - offset * 0.05;
      rotate = (i % 2 === 0 ? 1 : -1) * (Math.min(offset, 2) * 2);
    }
    
    return { y, scale, rotate, opacity };
  });

  return (
    <section id="agents" className="container relative flex min-h-screen flex-col justify-center py-16 md:py-24">
      <ScrollReveal>
        <h2 className="mb-12 text-center text-3xl font-extrabold md:text-5xl">{t('agents.title')}</h2>
      </ScrollReveal>
      
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center">
        <div
          role="tablist"
          aria-label="Agent selection"
          className="mb-8 flex w-full max-w-sm justify-around rounded-full bg-muted p-1"
        >
          {agents.map((agent, i) => (
            <button
              key={agent.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-controls={`agent-card-${agent.id}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                i === activeIndex
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary hover:text-foreground"
              )}
            >
              {agent.name}
            </button>
          ))}
        </div>

        <div ref={cardAreaRef} className="relative h-[600px] w-full md:h-[400px]">
          {agents.map((agent, i) => {
            const { y, scale, rotate, opacity } = cardTransforms[i];
            const isActive = i === activeIndex;

            return (
              <motion.div
                key={agent.id}
                id={`agent-card-${agent.id}`}
                role="tabpanel"
                aria-hidden={!isActive}
                className="absolute inset-0 rounded-xl border border-border p-8 shadow-lg bg-background"
                initial={false}
                animate={{ 
                  y, 
                  scale,
                  rotate,
                  opacity: isActive ? 1 : opacity,
                  zIndex: agents.length - i,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              >
                <AgentCardContent agent={agent} isVisible={isActive} />
              </motion.div>
            );
          })}
        </div>

        <ScrollReveal className="mt-12 text-center text-sm text-secondary">
           <p>{t('agents.microcopy')}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

const AgentCardContent = ({ agent, isVisible }: { agent: Agent, isVisible: boolean }) => {
  const { t } = useI18n();
  return (
    <div 
      className={cn(
        "grid h-full grid-cols-1 gap-8 transition-opacity duration-300 md:grid-cols-12",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden={!isVisible}
    >
      <div className="flex flex-col justify-center md:col-span-5">
        <h3 className="text-4xl font-extrabold text-gradient lg:text-5xl xl:text-6xl">{agent.name}</h3>
        <p className="mt-2 text-lg font-semibold text-secondary">{agent.role}</p>
        <Button asChild size="sm" className="mt-8 w-fit transform bg-primary transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-gradient-to-r from-gradient-start to-gradient-end">
          <Link href={`#${agent.id}`}>{t('agents.cta')}</Link>
        </Button>
      </div>
      <div className="flex flex-col justify-center md:col-span-7">
        <p className="mb-6">{agent.description}</p>
        <ul className="space-y-4">
          {agent.points.map((point, i) => (
            <li key={i} className="flex items-start gap-4">
              <DiamondBullet className="mt-1.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-semibold">
          <span className="text-secondary">{t('agents.result_prefix')}: </span>
          <span className="text-foreground">{agent.result}</span>
        </p>
      </div>
    </div>
  );
};
