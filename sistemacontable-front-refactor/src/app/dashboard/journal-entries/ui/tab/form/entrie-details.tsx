
import { DateTimePicker } from '@/components/ui/date-picker';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Entrie } from '@/schemas/entrie.schema'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { es } from "react-day-picker/locale";
import { Textarea } from '@/components/ui/textarea';
import { randomNumber } from '@/lib/utils';

type Props = {
  form: UseFormReturn<Entrie>;
}

export default function EntrieDetails({ form }: Props) {
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
      <div className='space-y-6'>
        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DateTimePicker
                  locale={es}
                  granularity="day"
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    field.onChange(date?.toISOString().split("T")[0]); // "YYYY-MM-DD"
                  }}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FloatingLabelInput
          value={randomNumber(6)}
          label={'Codigo del asiento'}
          type={'text'}
          disabled
        />
      </div>

      <div className="grid  gap-4 w-full">
        <FormField
          key={'descripcion'}
          control={form.control}
          name={'descripcion'}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descripción del asiento."
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}