"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, User, Lock, Eye, EyeOff } from "lucide-react";
import { updateProfileSchema, changePasswordSchema } from "@/lib/schemas/settings";
import { getProfile, updateProfile, changePassword } from "@/lib/actions/settings";

export default function SettingsPage() {
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [profilePending, setProfilePending] = useState(false);

  const [currPw, setCurrPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwPending, setPwPending] = useState(false);
  const [showProfilePw, setShowProfilePw] = useState(false);
  const [showCurr, setShowCurr] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    getProfile()
      .then((user) => {
        if (user) {
          setProfile({ name: user.name ?? "", email: user.email });
          setProfileName(user.name ?? "");
          setProfileEmail(user.email);
        }
      })
      .catch(() => toast.error("Gagal memuat profil"))
      .finally(() => setLoadingProfile(false));
  }, []);

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = profileName.trim();
    if (!trimmedName) { toast.error("Nama tidak boleh kosong"); return; }

    const result = updateProfileSchema.safeParse({
      name: trimmedName,
      email: profileEmail !== profile?.email ? profileEmail : undefined,
      currentPassword: profileEmail !== profile?.email ? profilePassword : undefined,
    });

    if (!result.success) {
      const errs = result.error.flatten().fieldErrors;
      const msg = Object.values(errs).flat()[0];
      toast.error(msg ?? "Data tidak valid");
      return;
    }

    setProfilePending(true);
    const res = await updateProfile(result.data);
    setProfilePending(false);

    if ("error" in res) { toast.error(res.error); return; }
    toast.success("Profil diperbarui");
    setProfilePassword("");
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    const result = changePasswordSchema.safeParse({
      currentPassword: currPw,
      newPassword: newPw,
      confirmPassword: confirmPw,
    });

    if (!result.success) {
      const errs = result.error.flatten().fieldErrors;
      const msg = Object.values(errs).flat()[0];
      toast.error(msg ?? "Data tidak valid");
      return;
    }

    setPwPending(true);
    const res = await changePassword(result.data);
    setPwPending(false);

    if ("error" in res) { toast.error(res.error); return; }
    toast.success("Password diperbarui");
    setCurrPw(""); setNewPw(""); setConfirmPw("");
  }

  if (loadingProfile) {
    return (
      <div className="mx-auto max-w-lg space-y-6 p-4 sm:p-6">
        <div className="space-y-1">
          <div className="h-6 w-32 rounded-md bg-muted/50 animate-pulse" />
          <div className="h-4 w-48 rounded-md bg-muted/50 animate-pulse" />
        </div>
        <div className="h-[300px] rounded-[14px] bg-muted/30 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 p-4 sm:p-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Pengaturan</h1>
        <p className="mt-0.5 text-sm text-muted-foreground/70">
          Kelola profil dan keamanan akun Anda
        </p>
      </div>

      <section className="rounded-[14px] border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-[8px] bg-primary/10 text-primary">
            <User className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Profil</h2>
            <p className="text-xs text-muted-foreground/60">Nama dan email akun</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              className="w-full rounded-[10px] border border-border/60 bg-surface px-3.5 py-2 text-sm text-foreground outline-none transition-all duration-150 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Nama</label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Nama lengkap"
              className="w-full rounded-[10px] border border-border/60 bg-surface px-3.5 py-2 text-sm text-foreground outline-none transition-all duration-150 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {profileEmail !== profile?.email && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Password Saat Ini</label>
              <div className="relative">
                <input
                  type={showProfilePw ? "text" : "password"}
                  value={profilePassword}
                  onChange={(e) => setProfilePassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full rounded-[10px] border border-border/60 bg-surface px-3.5 py-2 pr-9 text-sm text-foreground outline-none transition-all duration-150 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                />
                <button type="button" onClick={() => setShowProfilePw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground">
                  {showProfilePw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground/50">Diperlukan untuk mengubah email</p>
            </div>
          )}

          <button
            type="submit"
            disabled={profilePending}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-all duration-150 hover:bg-primary/90 active:translate-y-px disabled:pointer-events-none disabled:opacity-60"
          >
            {profilePending && <Loader2 className="size-4 animate-spin" />}
            {profilePending ? "Menyimpan..." : "Simpan Profil"}
          </button>
        </form>
      </section>

      <section className="rounded-[14px] border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-[8px] bg-primary/10 text-primary">
            <Lock className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Keamanan</h2>
            <p className="text-xs text-muted-foreground/60">Ubah password akun</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {[
            { id: "curr", label: "Password Saat Ini", state: currPw, set: setCurrPw, show: showCurr, setShow: setShowCurr },
            { id: "new", label: "Password Baru", state: newPw, set: setNewPw, show: showNew, setShow: setShowNew },
            { id: "confirm", label: "Konfirmasi Password Baru", state: confirmPw, set: setConfirmPw, show: showConfirm, setShow: setShowConfirm },
          ].map((field) => (
            <div key={field.id} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
              <div className="relative">
                <input
                  type={field.show ? "text" : "password"}
                  value={field.state}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.id === "curr" ? "Password saat ini" : field.id === "new" ? "Minimal 6 karakter" : "Ketik ulang password baru"}
                  className="w-full rounded-[10px] border border-border/60 bg-surface px-3.5 py-2 pr-9 text-sm text-foreground outline-none transition-all duration-150 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                />
                <button type="button" onClick={() => field.setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground">
                  {field.show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={pwPending}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-all duration-150 hover:bg-primary/90 active:translate-y-px disabled:pointer-events-none disabled:opacity-60"
          >
            {pwPending && <Loader2 className="size-4 animate-spin" />}
            {pwPending ? "Menyimpan..." : "Ubah Password"}
          </button>
        </form>
      </section>
    </div>
  );
}
