export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { nome, cognome, telefono, email, attivita, citta, messaggio } = data;

    // Controllo sicurezza: se la chiave manca, restituisci errore chiaro
    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "API Key mancante" }), { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", 
        to: "tua@email.it", // RICORDA: Cambiala con la tua vera mail!
        subject: `Nuova richiesta da ${nome} ${cognome}`,
        html: `
<body style="margin:0;padding:0;background:#F2EDE6;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
        <table width="560" cellpadding="0" cellspacing="0">

            <tr>
                <td style="background:#000000;padding:32px 36px 28px;">
                    <p style="margin:0 0 10px 0;font-size:10px;letter-spacing:3px;color:#476e52;font-family:Arial,sans-serif;text-transform:uppercase;">Baba Easy Food — Nuova Richiesta</p>
                    <p style="margin:0 0 4px 0;font-size:22px;color:#F2EDE6;font-weight:normal;">${nome} ${cognome}</p>
                    <p style="margin:0;font-size:13px;color:#f5f3ed;font-family:Arial,sans-serif;">${attivita || 'Attività non specificata'} &nbsp;·&nbsp; ${citta || 'Città non specificata'}</p>
                </td>
            </tr>

            <tr><td style="height:3px;background:#476e52;"></td></tr>

            <tr>
                <td style="background:#FFFFFF;padding:32px 36px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                        <tr>
                            <td style="width:50%;padding:0 16px 0 0;border-right:1px solid #EDE8E0;vertical-align:top;">
                                <p style="margin:0 0 4px 0;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#476e52;font-family:Arial,sans-serif;">Telefono</p>
                                <p style="margin:0;font-size:15px;color:#000000;">${telefono}</p>
                            </td>
                            <td style="width:50%;padding:0 0 0 16px;vertical-align:top;">
                                <p style="margin:0 0 4px 0;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#476e52;font-family:Arial,sans-serif;">Email</p>
                                <p style="margin:0;font-size:15px;color:#000000;">${email || '—'}</p>
                            </td>
                        </tr>
                    </table>

                    <div style="height:1px;background:#EDE8E0;margin-bottom:28px;"></div>

                    <p style="margin:0 0 10px 0;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#476e52;font-family:Arial,sans-serif;">Messaggio</p>
                    <div style="border-left:2px solid #000000;padding:14px 18px;background:#FAF7F3;">
                        <p style="margin:0;font-size:15px;color:#000000;line-height:1.75;font-style:italic;">${messaggio}</p>
                    </div>
                </td>
            </tr>

            <tr>
                <td style="background:#F2EDE6;padding:18px 36px;border-top:1px solid #DED8CF;">
                    <p style="margin:0;font-size:11px;color:#f5f3ed;font-family:Arial,sans-serif;text-align:center;letter-spacing:0.5px;">
                        babaeasyfood.it &nbsp;·&nbsp; Via Modigliani 7, Cinisello Balsamo &nbsp;·&nbsp; info@babaeasyfood.it
                    </p>
                </td>
            </tr>

        </table>
    </td></tr>
</table>
</body>
`
      })
    });

    const result = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ ok: false, error: result }), { status: res.status });
    }

    return new Response(JSON.stringify({ ok: true }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    // Questo cattura errori di parsing JSON o problemi di rete
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
