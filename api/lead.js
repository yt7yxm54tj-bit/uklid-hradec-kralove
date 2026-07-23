// Vercel serverless funkce: poptávkový formulář → Telegram notifikace
// Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (nastavené na Vercel projektu)
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name = "", phone = "", email = "", type = "", message = "", hpname = "" } = req.body || {};

  // honeypot — bot vyplnil skryté pole
  if (hpname) return res.status(200).json({ ok: true });

  if (!name.trim() || !email.includes("@")) {
    return res.status(400).json({ error: "Chybí jméno nebo platný e-mail." });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(500).json({ error: "Server není nakonfigurován." });

  const esc = (s) => String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
  const lines = [
    "🧹 <b>Nová poptávka — Úklid Hradec Králové</b>",
    "",
    `<b>Jméno:</b> ${esc(name)}`,
    phone ? `<b>Telefon:</b> ${esc(phone)}` : null,
    `<b>E-mail:</b> ${esc(email)}`,
    type ? `<b>Typ úklidu:</b> ${esc(type)}` : null,
    message ? `\n${esc(message)}` : null,
  ].filter(Boolean);

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), parse_mode: "HTML" }),
  });

  if (!tg.ok) {
    const detail = await tg.text().catch(() => "");
    console.error("telegram error:", tg.status, detail);
    return res.status(502).json({ error: "Notifikaci se nepodařilo odeslat." });
  }
  return res.status(200).json({ ok: true });
}
