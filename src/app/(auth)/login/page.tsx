import { Suspense } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  return (
    <AuthCard
      title="Masuk"
      description="Masuk ke akun AgendaKu kamu"
    >
      <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
