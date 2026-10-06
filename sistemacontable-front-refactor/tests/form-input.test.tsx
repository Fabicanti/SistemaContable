import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/form/form-input'
import { FormPasswordInput } from '@/components/form/form-password-input'

function Fixture({ disabled = false, onSubmit = jest.fn() }) {
  const form = useForm({ defaultValues: { username: '', password: '' } })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput control={form.control} name="username" label="Usuario" description="Usá tu nombre de usuario." rules={{ required: 'Ingresá un usuario' }} disabled={disabled} />
        <FormPasswordInput control={form.control} name="password" label="Contraseña" autoComplete="new-password" disabled={disabled} />
        <button type="submit">Guardar</button>
      </form>
    </Form>
  )
}

test('associates help and errors, focuses invalid input, and submits field values', async () => {
  const onSubmit = jest.fn()
  render(<Fixture onSubmit={onSubmit} />)
  const user = screen.getByLabelText('Usuario')
  expect(user).toHaveAccessibleDescription('Usá tu nombre de usuario.')
  fireEvent.click(screen.getByText('Guardar'))
  await waitFor(() => expect(user).toHaveFocus())
  expect(user).toHaveAttribute('aria-invalid', 'true')
  expect(user).toHaveAccessibleDescription('Usá tu nombre de usuario. Ingresá un usuario')
  fireEvent.change(user, { target: { value: 'ana' } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'ejemplo' } })
  fireEvent.click(screen.getByText('Guardar'))
  await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ username: 'ana', password: 'ejemplo' }, expect.anything()))
})

test('password visibility toggle preserves the value and does not submit', () => {
  const onSubmit = jest.fn()
  render(<Fixture onSubmit={onSubmit} />)
  const password = screen.getByLabelText('Contraseña')
  fireEvent.change(password, { target: { value: 'ejemplo' } })
  fireEvent.click(screen.getByRole('button', { name: 'Mostrar contraseña' }))
  expect(password).toHaveAttribute('type', 'text')
  expect(password).toHaveValue('ejemplo')
  expect(password).toHaveAttribute('autocomplete', 'new-password')
  fireEvent.click(screen.getByRole('button', { name: 'Ocultar contraseña' }))
  expect(password).toHaveAttribute('type', 'password')
  expect(onSubmit).not.toHaveBeenCalled()
})

test('disabled applies to both the input and the password toggle', () => {
  render(<Fixture disabled />)
  expect(screen.getByLabelText('Usuario')).toBeDisabled()
  expect(screen.getByLabelText('Contraseña')).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Mostrar contraseña' })).toBeDisabled()
})
