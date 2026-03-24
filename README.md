# Baba Easy Food – Website README

## Overview

This is the complete single-page website for **Baba Easy Food S.r.l.s.**, a B2B Cash & Carry food wholesale company based in Cinisello Balsamo (Milan), serving restaurants and commercial activities across Lombardy, Italy.

## Files

| File | Description |
|------|-------------|
| `index.html` | Main HTML file — complete, production-ready |
| `style.css` | All styles — mobile-first, responsive |
| `script.js` | All JavaScript — animations, interactions |
| `images/` | All downloaded and optimized images |
| `README.md` | This file — setup instructions and placeholders |

## [ASK CLIENT] Placeholders

The following information was not found publicly and requires confirmation from the client before going live:

| Placeholder | Location | Reason |
|-------------|----------|--------|
| `info@babaeasyfood.it` | `index.html` — Contatti section & footer | Email address not found in any public source. Replace with the actual business email. |
| Opening hours `Lun – Sab: 08:00 – 18:00` | `index.html` — Contatti section | Exact opening hours not publicly listed. The Cylex listing showed "Aperto ora" but no specific hours. Confirm and update. |
| Google Reviews / Testimonials | `index.html` — Recensioni section | No verified Google reviews were found publicly. The three testimonial cards are placeholders. Replace with real customer reviews. |
| Google Analytics ID `G-XXXXXXXXXX` | `index.html` — `<head>` section | Uncomment the GA4 script and replace with the actual Measurement ID from Google Analytics. |
| Google Maps embed URL | `index.html` — Zone Servite section | The embedded map uses a placeholder coordinate URL. Replace with the actual Google Maps embed code from: https://maps.google.com → Share → Embed a map |
| Domain / URL | `index.html` — Open Graph & Schema.org | Replace `https://babaeasyfood.it` with the actual domain once registered. |
| OG Image | `images/og-image.jpg` | Create a 1200×630px branded image for social sharing previews. |

## Business Information (Verified)

The following data was verified from public sources (iCribis, Cylex, TikTok, Facebook):

| Field | Value |
|-------|-------|
| Full Legal Name | BABA EASY FOOD SOCIETA' A RESPONSABILITA' LIMITATA SEMPLIFICATA |
| Short Name | Baba Easy Food S.r.l.s. |
| Legal Form | Società Semplificata a Responsabilità Limitata |
| REA Code | MI - 2619382 |
| VAT Number | 11691160961 |
| ATECO Code | 56.00.00 |
| Address | Via Amedeo Modigliani, 7 — 20092 Cinisello Balsamo (MI) |
| Phone | 02 612 3943 |
| WhatsApp | +39 334 753 5528 |
| TikTok | @babaeasyfood |
| Instagram | @babaeasyfood |
| Facebook | BABA EASY FOOD (100070875776282) |

## Setup Instructions

### 1. Google Analytics
1. Go to https://analytics.google.com and create a GA4 property
2. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
3. Open `index.html`, find the Google Analytics comment block in `<head>`
4. Uncomment the two `<script>` tags and replace `G-XXXXXXXXXX` with your ID

### 2. Contact Form
The current form shows a success message on submit (frontend-only). To make it functional:
- **Option A (Netlify)**: Add `netlify` attribute to the `<form>` tag if hosting on Netlify
- **Option B (FormSpree)**: Sign up at https://formspree.io, get a form endpoint, and update the form action
- **Option C (Custom backend)**: Implement a server-side handler and update the fetch call in `script.js`

### 3. Google Maps Embed
1. Go to https://maps.google.com
2. Search for "Via Amedeo Modigliani 7, Cinisello Balsamo"
3. Click Share → Embed a map
4. Copy the `<iframe>` src URL
5. Replace the placeholder src in `index.html` (Zone Servite section)

### 4. Images
All images in the `/images/` folder are sourced from public domain / royalty-free sources. For best results, replace with actual photos of the Baba Easy Food warehouse and products.

## Deployment

The website is deployed at the URL provided separately. It is a static site compatible with:
- **Netlify** (recommended — free, fast CDN, form handling)
- **Vercel** (free, fast)
- **GitHub Pages** (free)

## Technical Stack

- HTML5 + CSS3 + Vanilla JavaScript (no frameworks)
- Google Fonts: Poppins + Inter
- Font Awesome 6 (CDN)
- AOS.js for scroll animations
- Mobile-first responsive design
- Schema.org LocalBusiness structured data
- Open Graph meta tags

## Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Green | `#1B4332` | Primary brand color, navbar, footer |
| Mid Green | `#2D6A4F` | Secondary green, accents |
| Gold | `#D4A017` | Accent color, CTAs, highlights |
| White | `#FFFFFF` | Backgrounds, text on dark |
