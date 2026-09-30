
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Entrie } from '@/schemas/entrie.schema'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
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
    <div className='grid grid-cols-1 gap-5 lg:grid-cols-[minmax(240px,1fr)_2fr]'>
      <div className='space-y-6'>
        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha del asiento</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      id="date"
                      className="w-full justify-between font-normal"
                    >
                      {field.value ? (
                        format(new Date(field.value + "T00:00:00"), "PPP", { locale: es })
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
                      selected={field.value ? new Date(field.value + "T00:00:00") : undefined}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        if (date) { field.onChange(format(date, "yyyy-MM-dd")); setOpen(false); }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

      </div>

      <div className="grid  gap-4 w-full">
        <FormField
          key={'descripcion'}
          control={form.control}
          name={'descripcion'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-20 resize-y"
                  placeholder="Ej.: Pago de sueldos de septiembre"
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