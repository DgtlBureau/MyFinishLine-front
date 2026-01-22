import * as React from "react";

import { cn } from "@/app/lib/utils";

const Input = React.memo(
  ({
    className,
    containerClassName,
    error,
    displayError = true,
    type,
    ...props
  }: {
    displayError?: boolean;
    containerClassName?: string;
    error?: string;
  } & React.ComponentProps<"input">) => {
    return (
      <div className={containerClassName}>
        <input
          type={type}
          data-slot="input"
          onBlur={props.onBlur}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            error && "ring-1 ring-red-400",
            className,
          )}
          {...props}
        />
        {displayError && (
          <span className="text-red-400 text-xs leading-0">{error}</span>
        )}
      </div>
    );
  },
);

export { Input };
