import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthCard
      title="Masuk"
      description="Masuk ke akun AgendaKu kamu"
    >
      <LoginForm />
    </AuthCard>
  );
}
