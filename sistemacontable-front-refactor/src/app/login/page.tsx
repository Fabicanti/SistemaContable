import { Metadata } from "next";
import LoginForm from "./ui/login-form";
import LoginView from "./ui/login-view";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex">
      <LoginForm />
      <LoginView />
    </div>
  )
}