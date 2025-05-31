"use client"

import { Login, loginSchema } from "@/schemas/login.schema";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export default function useAuth() {

  const router = useRouter();
  const { isLoading, login, logout } = useAuthStore();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = async (credentials: Login) => {
    console.log('credentials', credentials);
    await login(credentials);
    router.push('/dashboard');
  }

  const onLogout = async () => {
    await logout();
    router.push('/login')
  }

  return {
    form,
    isLoading,

    register: form.register,
    handleSubmit: form.handleSubmit,
    onSubmit,
    onLogout,
  }
}
