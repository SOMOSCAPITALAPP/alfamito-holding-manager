export const sessionCookieName = "alfamito_session";
export const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;

type SessionPayload = {
  email: string;
  exp: number;
  v: 1;
};

const encoder = new TextEncoder();

function authSecret() {
  return (
    process.env.ALFAMITO_AUTH_SECRET ??
    process.env.AUTH_SECRET ??
    "alfamito-local-auth-secret-change-after-test"
  );
}

function base64UrlEncode(value: string | ArrayBuffer) {
  const bytes =
    typeof value === "string" ? encoder.encode(value) : new Uint8Array(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64UrlDecode(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/");
  const normalized = padded.padEnd(
    padded.length + ((4 - (padded.length % 4)) % 4),
    "=",
  );
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function signingKey() {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(authSecret()),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign", "verify"],
  );
}

export async function createSessionToken(email: string) {
  const payload: SessionPayload = {
    email,
    exp: Date.now() + sessionMaxAgeSeconds * 1000,
    v: 1,
  };
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(),
    encoder.encode(body),
  );

  return `${body}.${base64UrlEncode(signature)}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [body, signature] = token.split(".");
  if (!body || !signature) {
    return null;
  }

  const expectedSignature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(),
    encoder.encode(body),
  );

  if (base64UrlEncode(expectedSignature) !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(body)) as SessionPayload;
    if (!payload.email || payload.v !== 1 || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
