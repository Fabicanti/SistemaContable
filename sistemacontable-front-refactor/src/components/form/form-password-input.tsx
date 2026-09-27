"use client"

import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import type { FieldValues } from 'react-hook-form'
import { FormInput, type FormInputProps } from './form-input'

export type FormPasswordInputProps<T extends FieldValues> = Omit<FormInputProps<T>, 'type' | 'endAdornment'>

export function FormPasswordInput<T extends FieldValues>({
  disabled, readOnly, icon = LockKeyhole, accent = 'violet', ...props
}: FormPasswordInputProps<T>) {
  const [visible, setVisible] = useState(false)

  return (
    <FormInput
      {...props}
      icon={icon}
      accent={accent}
      disabled={disabled}
      readOnly={readOnly}
      type={visible ? 'text' : 'password'}
      endAdornment={
        <button
          type="button"
          disabled={disabled}
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={visible}
          className={`absolute top-1 right-1 flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 ${accent === 'pink' ? 'focus-visible:outline-pink-500' : 'focus-visible:outline-violet-500'} disabled:pointer-events-none disabled:opacity-50`}
        >
          {visible ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
        </button>
      }
    />
  )
}
