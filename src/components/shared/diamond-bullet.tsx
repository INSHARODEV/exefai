import { cn } from '@/lib/utils';

export function DiamondBullet({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative h-[10px] w-[10px] shrink-0 rotate-45 transform bg-primary',
        className
      )}
    />
  );
}
