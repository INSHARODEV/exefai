"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';

interface CountUpProps {
  num: number;
  className?: string;
  duration?: number;
}

export function CountUp({ num, className, duration = 500 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = num;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentCount = Math.floor(progress * (end - start) + start);
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, num, duration]);

  const formattedNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <span ref={ref} className={cn(className)}>
      {formattedNum(count)}
    </span>
  );
}
