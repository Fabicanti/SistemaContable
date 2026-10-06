"use client";

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function FloatingInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input data-slot="floating-input" placeholder=" " className={cn('peer h-10', className)} {...props} />;
}

function FloatingLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="floating-label"
      className={cn(
        'absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-muted-foreground duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text',
        className,
      )}
      {...props}
    />
  );
}


type FloatingLabelInputProps = React.ComponentProps<typeof Input> & { label?: string };

function FloatingLabelInput({ id, label, ...props }: FloatingLabelInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  return (
    <div data-slot="floating-label-input" className="relative">
      <FloatingInput id={inputId} {...props} />
      <FloatingLabel htmlFor={inputId}>{label}</FloatingLabel>
    </div>
  );
}

export { FloatingInput, FloatingLabel, FloatingLabelInput };
