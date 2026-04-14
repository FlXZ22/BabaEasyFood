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
        html: `... il tuo HTML ...`
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
