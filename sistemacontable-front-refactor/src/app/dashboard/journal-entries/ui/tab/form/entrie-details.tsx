
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Entrie } from '@/schemas/entrie.schema'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { randomNumber } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

type Props = {
  form: UseFormReturn<Entrie>;
}

export default function EntrieDetails({ form }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
      <div className='space-y-6'>
        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* <DateTimePicker
                  locale={es}
                  granularity="day"
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    field.onChange(date?.toISOString().split("T")[0]); // "YYYY-MM-DD"
                  }}
                /> */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal"
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", { locale: es })
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      locale={es}
                      mode="single"
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        field.onChange(date?.toISOString().split("T")[0]);
                      }}
                    />
                  </PopoverContent>
                </Popover>
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