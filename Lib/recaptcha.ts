// Lib/recaptcha.ts
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  const res = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    }
  );

  const data = await res.json();

  // data: { success: true, score: 0.9, action: "signup_submit", ... }
  return data.success && data.score >= 0.5;
}
