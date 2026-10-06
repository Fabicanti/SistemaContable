"use client"

import { useAuthStore } from "@/stores/auth-store"
import { useUserStore } from "@/stores/user-store";
import { useEffect } from "react"

/**
 * Aqui podremos agregar verificaciones globales para el dashboard,
 * como por ejemplo, verificar si el usuario esta autenticado,
 * o si tiene los permisos necesarios para acceder a ciertas secciones.
 */
export function Verification() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    if (user) return;
    checkAuth()
    
  }, [user, checkAuth]);

  return null
}