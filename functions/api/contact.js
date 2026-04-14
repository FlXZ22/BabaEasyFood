function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function createContactEmail(data = {}) {
    const nome = escapeHtml(data.nome || "");
    const cognome = escapeHtml(data.cognome || "");
    const attivita = escapeHtml(data.attivita || data.azienda || "Attivita non specificata");
    const citta = escapeHtml(data.citta || "Citta non specificata");
    const telefono = escapeHtml(data.telefono || "Non indicato");
    const email = escapeHtml(data.email || "Non indicata");
    const messaggio = escapeHtml(data.messaggio || "Nessun messaggio inserito").replace(/\r?\n/g, "<br />");
    const nominativo = `${nome} ${cognome}`.trim() || "Contatto senza nome";

    return `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Nuova richiesta contatto</title>
    <style>
        body, table, td, p, a, span {
            margin: 0;
            padding: 0;
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        }

        body {
            width: 100% !important;
            background-color: #f7f3ec;
            color: #1f1a17;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        .wrap {
            width: 100%;
            background-color: #f7f3ec;
        }

        .frame {
            width: 100%;
            max-width: 640px;
        }

        .panel {
            background-color: #ffffff;
            border: 1px solid #e8dfd2;
        }

        .brand {
            font-size: 12px;
            line-height: 1.4;
            letter-spacing: 2.4px;
            text-transform: uppercase;
            color: #7f8d63;
            font-weight: bold;
        }

        .hero-title {
            font-family: Georgia, "Times New Roman", serif;
            font-size: 34px;
            line-height: 1.1;
            font-weight: normal;
            color: #1f1a17;
        }

        .body-copy {
            font-size: 15px;
            line-height: 1.8;
            color: #6e655c;
        }

        .section-label {
            font-size: 11px;
            line-height: 1.4;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: #8b9772;
        }

        .primary-value {
            font-size: 16px;
            line-height: 1.7;
            color: #1f1a17;
        }

        .name-value {
            font-family: Georgia, "Times New Roman", serif;
            font-size: 28px;
            line-height: 1.2;
            color: #1f1a17;
        }

        .rule {
            border-top: 1px solid #eee5d9;
        }

        .message-box {
            background-color: #fbf8f2;
            border: 1px solid #eee5d9;
        }

        .footer {
            font-size: 12px;
            line-height: 1.8;
            text-align: center;
            color: #8e8479;
        }

        .col {
            width: 50%;
        }

        @media only screen and (max-width: 640px) {
            .frame {
                width: 100% !important;
            }

            .pad {
                padding-left: 22px !important;
                padding-right: 22px !important;
            }

            .col {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                border-right: 0 !important;
            }

            .mobile-gap {
                padding-top: 18px !important;
            }

            .hero-title {
                font-size: 30px !important;
            }

            .name-value {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body>
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Nuova richiesta ricevuta dal form contatti di Baba Easy Food.
</div>

<table role="presentation" class="wrap" width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" style="padding:32px 16px;">
            <table role="presentation" class="frame" width="640" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="padding-bottom:14px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:3px;background-color:#7f8d63;"></td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td class="panel pad" style="padding:42px 44px 22px;">
                        <p class="brand" style="margin-bottom:16px;">Baba Easy Food</p>
                        <p class="hero-title" style="margin-bottom:14px;">Nuova richiesta dal sito</p>
                        <p class="body-copy">
                            Contatto ricevuto dal form online. Tutti i dettagli utili sono raccolti qui sotto con una struttura semplice e immediata.
                        </p>
                    </td>
                </tr>

                <tr>
                    <td class="panel pad" style="padding:0 44px 34px;border-top:0;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="rule" style="padding:20px 0 28px;">
                                    <p class="section-label" style="margin-bottom:8px;">Contatto</p>
                                    <p class="name-value">${nominativo}</p>
                                    <p class="body-copy" style="margin-top:8px;">${attivita} | ${citta}</p>
                                </td>
                            </tr>
                        </table>

                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="col" style="padding:0 20px 24px 0;vertical-align:top;border-right:1px solid #eee5d9;">
                                    <p class="section-label" style="margin-bottom:8px;">Telefono</p>
                                    <p class="primary-value">${telefono}</p>
                                </td>
                                <td class="col mobile-gap" style="padding:0 0 24px 20px;vertical-align:top;">
                                    <p class="section-label" style="margin-bottom:8px;">Email</p>
                                    <p class="primary-value">${email}</p>
                                </td>
                            </tr>
                        </table>

                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td class="rule" style="padding-top:26px;">
                                    <p class="section-label" style="margin-bottom:12px;">Messaggio</p>
                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="message-box">
                                        <tr>
                                            <td style="padding:20px 22px;">
                                                <p class="primary-value" style="line-height:1.85;">${messaggio}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td style="padding:18px 22px 0;">
                        <p class="footer">
                            babaeasyfood.it | Via Amedeo Modigliani, 7, Cinisello Balsamo | info@babaeasyfood.it
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>`;
}

module.exports = {
    createContactEmail
};

