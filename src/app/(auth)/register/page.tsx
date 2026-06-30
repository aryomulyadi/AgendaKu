import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Daftar"
      description="Buat akun baru AgendaKu"
    >
      <RegisterForm />
    </AuthCard>
  );
}
