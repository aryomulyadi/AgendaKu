"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { registerSchema, type RegisterInput } from "@/lib/schemas/auth";

export async function registerAction(data: RegisterInput) {
  const validated = registerSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: "Data tidak valid",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validated.data;

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: "Email sudah terdaftar" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      rememberMe: "true",
      redirect: false,
    });
    return { success: true as const };
  } catch {
    return { error: "Akun berhasil dibuat, tetapi gagal masuk otomatis" };
  }
}
