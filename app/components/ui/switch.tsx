"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/app/lib/utils";

function Switch({
  className,
  classNameThumb,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  classNameThumb?: string;
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-white/40 data-[state=checked]:backdrop-blur-xl data-[state=checked]:border-white/50 data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.7rem] w-12 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-white pointer-events-none block size-5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[115%] data-[state=unchecked]:translate-x-[15%] shadow-sm",
          classNameThumb
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
