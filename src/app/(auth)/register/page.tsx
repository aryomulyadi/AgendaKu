import { Suspense } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Daftar"
      description="Buat akun baru AgendaKu"
    >
      <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>}>
        <RegisterForm />
      </Suspense>
    </AuthCard>
  );
}
