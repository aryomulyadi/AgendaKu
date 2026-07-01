"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/schemas/auth";
import { registerAction } from "@/lib/actions/auth";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  function onSubmit(data: RegisterInput) {
    startTransition(async () => {
      const result = await registerAction(data);

      if (result.error) {
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(
            result.fieldErrors,
          )) {
            if (messages?.length) {
              toast.error(`${field}: ${messages[0]}`);
            }
          }
          return;
        }
        toast.error(result.error);
        return;
      }

      toast.success("Akun berhasil dibuat");

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        rememberMe: "true",
        redirect: false,
      });

      if (!signInResult?.error) {
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Akun berhasil dibuat, tetapi gagal login otomatis. Silakan login manual.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="text-sm font-medium text-foreground"
        >
          Nama
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Nama lengkap"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
          className="w-full rounded-[10px] border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-150 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

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
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "reg-email-error" : undefined}
          {...register("email")}
          className="w-full rounded-[10px] border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-150 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        {errors.email && (
          <p id="reg-email-error" className="text-xs text-destructive">{errors.email.message}</p>
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
          autoComplete="new-password"
          placeholder="Minimal 6 karakter"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "reg-password-error" : undefined}
          {...register("password")}
          className="w-full rounded-[10px] border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-150 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        {errors.password && (
          <p id="reg-password-error" className="text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-all duration-150 hover:bg-primary/90 active:translate-y-px disabled:pointer-events-none disabled:opacity-60"
      >
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {isPending ? "Memproses..." : "Daftar"}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Masuk
        </Link>
      </p>
    </form>
  );
}
