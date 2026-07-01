import type { NextAuthConfig } from "next-auth";

function base64url(str: string) {
  return btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function fromBase64url(str: string) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (str.length % 4)) % 4);
  return atob(padded);
}

async function signHmac(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return base64url(String.fromCharCode(...new Uint8Array(sig)));
}

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    async encode({ token, secret, maxAge }) {
      const maxAgeSec = maxAge ?? 30 * 24 * 60 * 60;
      const rememberMe = (token as Record<string, unknown>).rememberMe;
      const exp =
        rememberMe === false
          ? Math.floor(Date.now() / 1000) + 86400
          : Math.floor(Date.now() / 1000) + maxAgeSec;

      const payload = {
        ...token,
        iat: Math.floor(Date.now() / 1000),
        exp,
      };

      const header = { alg: "HS256", typ: "JWT" };
      const headerEncoded = base64url(JSON.stringify(header));
      const payloadEncoded = base64url(JSON.stringify(payload));
      const secretStr = Array.isArray(secret) ? secret[0] : secret;
      const signature = await signHmac(secretStr, `${headerEncoded}.${payloadEncoded}`);

      return `${headerEncoded}.${payloadEncoded}.${signature}`;
    },
    async decode({ token, secret }) {
      if (!token) return null;
      const parts = token.split(".");
      if (parts.length !== 3) return null;

      const [headerEncoded, payloadEncoded, signature] = parts;

      const secretStr = Array.isArray(secret) ? secret[0] : secret;
      const expectedSig = await signHmac(secretStr, `${headerEncoded}.${payloadEncoded}`);

      if (signature !== expectedSig) return null;

      const payload = JSON.parse(fromBase64url(payloadEncoded));

      if (payload.exp && Date.now() / 1000 > payload.exp) return null;

      return payload;
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rememberMe = (user as unknown as Record<string, unknown>).rememberMe;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
