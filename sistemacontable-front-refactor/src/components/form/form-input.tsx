"use client"

import type { ComponentProps, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'

const accents = {
  violet: {
    ring: 'focus-visible:ring-violet-500/15 dark:focus-visible:ring-violet-400/20',
    focus: 'peer-focus:text-violet-600 dark:peer-focus:text-violet-400',
    filled: 'text-violet-600 dark:text-violet-400',
  },
  pink: {
    ring: 'focus-visible:ring-pink-500/15 dark:focus-visible:ring-fuchsia-400/20',
    focus: 'peer-focus:text-pink-600 dark:peer-focus:text-fuchsia-400',
    filled: 'text-pink-600 dark:text-fuchsia-700',
  },
} as const

export type FormInputProps<T extends FieldValues> = Omit<
  ComponentProps<typeof Input>,
  'name' | 'id' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'ref'
> & {
  control: Control<T>
  name: FieldPath<T>
  label: ReactNode
  icon?: LucideIcon
  accent?: keyof typeof accents
  description?: ReactNode
  /** Layout classes for the field; className styles the input itself. */
  itemClassName?: string
  endAdornment?: ReactNode
  rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export function FormInput<T extends FieldValues>({
  control, name, label, icon: Icon, accent = 'violet', description, itemClassName, endAdornment, rules, className, ...props
}: FormInputProps<T>) {
  return (
    <FormField control={control} name={name} rules={rules} render={({ field, fieldState }) => (
      <FormItem className={itemClassName}>
        <FormLabel className="text-sm font-medium">{label}</FormLabel>
        <div className="relative">
          <FormControl>
            <Input
              {...props}
              {...field}
              value={field.value ?? ''}
              className={cn(
                'peer h-12 rounded-lg bg-background px-3.5 shadow-none transition-[border-color,box-shadow] motion-reduce:transition-none',
                !fieldState.invalid && accents[accent].ring,
                endAdornment && 'pr-12',
                Icon && 'pl-10',
                className,
              )}
            />
          </FormControl>
          {Icon && (
            <Icon
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 transition-colors motion-reduce:transition-none',
                fieldState.invalid
                  ? 'text-destructive'
                  : cn(
                      accents[accent].focus,
                      field.value !== undefined && field.value !== null && String(field.value).length > 0
                        ? accents[accent].filled
                        : 'text-muted-foreground',
                    ),
              )}
            />
          )}
          {endAdornment}
        </div>
        {description && <FormDescription className="text-xs">{description}</FormDescription>}
        <FormMessage className="text-xs" />
      </FormItem>
    )} />
  )
}
