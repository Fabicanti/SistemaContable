"use client"

import { Login, loginSchema } from "@/schemas/login.schema";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function useAuth() {

  const router = useRouter();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = async (credentials: Login) => {
    console.log('credentials', credentials);
    // router.push('/dashboard');
  }

  return {
    form,

    register: form.register,
    handleSubmit: form.handleSubmit,
    onSubmit,
  }
}
