import Image from 'next/image';
import { cn } from "@/lib/utils"

export function ExefaiLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
       <Image
        src="/logoo.png"
        alt=".exefai logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
