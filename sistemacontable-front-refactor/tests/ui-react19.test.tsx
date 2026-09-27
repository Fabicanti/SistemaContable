import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  // JSDOM does not perform layout. Keep the real chart context and tooltip.
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
}));

function FormFixture() {
  const { register, handleSubmit } = useForm<{ description: string }>();
  return (
    <form onSubmit={handleSubmit(jest.fn())}>
      <FloatingLabelInput label="Descripción" {...register('description', { required: true })} />
      <Button type="submit">Guardar</Button>
    </form>
  );
}

test('React Hook Form can focus an invalid floating input through its React 19 ref', async () => {
  render(<FormFixture />);
  fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));
  await waitFor(() => expect(screen.getByLabelText('Descripción')).toHaveFocus());
});

test('Radix tabs switch panels with the keyboard', async () => {
  render(
    <Tabs defaultValue="create">
      <TabsList aria-label="Asientos">
        <TabsTrigger value="create">Crear</TabsTrigger>
        <TabsTrigger value="list">Ver</TabsTrigger>
      </TabsList>
      <TabsContent value="create">Formulario</TabsContent>
      <TabsContent value="list">Listado</TabsContent>
    </Tabs>,
  );
  const firstTab = screen.getByRole('tab', { name: 'Crear' });
  act(() => firstTab.focus());
  fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
  await waitFor(() => expect(screen.getByRole('tab', { name: 'Ver' })).toHaveAttribute('aria-selected', 'true'));
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Listado');
});

test('Radix asChild buttons open and close a dialog and restore focus', async () => {
  render(
    <Dialog>
      <DialogTrigger asChild><Button>Abrir</Button></DialogTrigger>
      <DialogContent>
        <DialogTitle>Detalle</DialogTitle>
        <DialogDescription>Información del asiento</DialogDescription>
        <DialogClose asChild><Button>Volver</Button></DialogClose>
      </DialogContent>
    </Dialog>,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Abrir' }));
  expect(screen.getByRole('dialog')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: 'Volver' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(screen.getByRole('button', { name: 'Abrir' })).toHaveFocus();
});

test('chart styles use a selector-safe React 19 id and the tooltip displays zero', () => {
  const { container } = render(
    <ChartContainer config={{ amount: { label: 'Saldo', color: 'var(--chart-1)' } }}>
      <ChartTooltipContent active hideLabel payload={[{
        graphicalItemId: 'balance', dataKey: 'amount', name: 'amount', value: 0,
        payload: { fill: 'var(--chart-1)' },
      }]} />
    </ChartContainer>,
  );
  expect(screen.getByText('Saldo')).toBeVisible();
  expect(screen.getByText('0')).toBeVisible();
  const chartId = container.querySelector('[data-chart]')?.getAttribute('data-chart');
  expect(chartId).toMatch(/^chart-[a-zA-Z0-9_-]+$/);
  const style = Array.from(document.querySelectorAll('style')).find((element) =>
    element.textContent?.includes(`[data-chart="${chartId}"]`),
  );
  expect(style).toBeDefined();
});
