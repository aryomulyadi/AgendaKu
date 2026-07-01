"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/schemas/auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginInput) {
    setIsPending(true);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        rememberMe: String(rememberMe),
        redirect: false,
      });

      if (result?.error) {
        toast.error("Email atau password salah");
        return;
      }

      toast.success("Berhasil masuk");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          {...register("email")}
          className="w-full rounded-[10px] border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-150 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Minimal 6 karakter"
          {...register("password")}
          className="w-full rounded-[10px] border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-150 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        {errors.password && (
          <p className="text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="size-4 rounded border-border accent-primary"
        />
        <span className="text-sm text-muted-foreground">Ingat Saya</span>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-all duration-150 hover:bg-[#D0311E] active:translate-y-px disabled:pointer-events-none disabled:opacity-60"
      >
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {isPending ? "Memproses..." : "Masuk"}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Daftar
        </Link>
      </p>
    </form>
  );
}
