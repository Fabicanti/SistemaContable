
import { Register, registerSchema } from '@/schemas/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function useRegister() {

  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    }
  });

  const onSubmit = (user: Register) => {
    console.log("Usuario creado: ", user);
    form.reset()
  }

  return {
    form,

    handleSubmit: form.handleSubmit,
    onSubmit
  }
}
