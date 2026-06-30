"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import {
  updateProfileSchema,
  changePasswordSchema,
  type UpdateProfileInput,
  type ChangePasswordInput,
} from "@/lib/schemas/settings";

export async function getProfile() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  });

  return user;
}

export async function updateProfile(data: UpdateProfileInput) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validated = updateProfileSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", fieldErrors: validated.error.flatten().fieldErrors };
  }

  const updateData: Record<string, string> = {};

  if (validated.data.name) updateData.name = validated.data.name;

  if (validated.data.email && validated.data.email !== session.user.email) {
    const existing = await prisma.user.findUnique({ where: { email: validated.data.email } });
    if (existing) return { error: "Email sudah digunakan" };

    if (!validated.data.currentPassword) {
      return { error: "Password saat ini diperlukan untuk mengubah email" };
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return { error: "Pengguna tidak ditemukan" };

    const valid = await bcrypt.compare(validated.data.currentPassword, user.password);
    if (!valid) return { error: "Password saat ini salah" };

    updateData.email = validated.data.email;
  }

  if (Object.keys(updateData).length === 0) return { error: "Tidak ada data yang diubah" };

  await prisma.user.update({
    where: { id: session.user.id },
    data: updateData,
  });

  return { success: true as const };
}

export async function changePassword(data: ChangePasswordInput) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const validated = changePasswordSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Data tidak valid", fieldErrors: validated.error.flatten().fieldErrors };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { error: "Pengguna tidak ditemukan" };

  const valid = await bcrypt.compare(validated.data.currentPassword, user.password);
  if (!valid) return { error: "Password saat ini salah" };

  const hashedPassword = await bcrypt.hash(validated.data.newPassword, 12);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedPassword },
  });

  return { success: true as const };
}
