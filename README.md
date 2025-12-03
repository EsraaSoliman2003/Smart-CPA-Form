# Simple Lead Capture Form

## Overview

A minimal bilingual (Arabic/English) **Lead Capture Form** built with
**React**, **TailwindCSS**, **Framer Motion**, and **react-i18next**.\
The form sends user data (name, email, optional phone) to **Google
Sheets** via Google Apps Script and displays a clean **Thank You**
screen after submission.

This project is ideal for: - Landing pages\
- CPA marketing\
- Simple funnels\
- Lead collection\
- Email/phone capture flows

------------------------------------------------------------------------

## ✨ Features

-   📝 Simple, clean lead form (Name, Email, Phone)
-   🌐 Full Arabic/English support using `react-i18next`
-   💾 Language stored in `localStorage` (default = Arabic)
-   🔄 Auto-detect language from URL (`?lang=ar|en`)
-   ☁️ Sends data to Google Sheets using Google Apps Script
-   🎨 TailwindCSS UI + custom green theme
-   🌿 Animated background with falling leaves (Framer Motion)
-   📱 Fully responsive
-   ⚡ Smooth transitions between Form → Thanks screen
-   🛡️ Optional privacy message and security styling

------------------------------------------------------------------------

## 📂 Project Structure

    src/
      assets/                  
      components/
        LeadForm.jsx
        Thanks.jsx
      locales/
        ar.json
        en.json
      styles/
        global.css
      App.jsx
      i18n.js
      main.jsx

------------------------------------------------------------------------

## 🚀 Getting Started

### 1. Install dependencies

``` bash
npm install
# or
yarn
# or
pnpm install
```

### 2. Run development server

``` bash
npm run dev
```

### 3. Build for production

``` bash
npm run build
```

------------------------------------------------------------------------

## 🌍 Internationalization (i18n)

Language priority:

1.  URL parameter (`?lang=ar` or `?lang=en`)
2.  `localStorage.language`
3.  Default → **Arabic ("ar")**

### Add a new language

1.  Add new file inside `src/locales/` (example: `fr.json`)
2.  Register in `i18n.js`
3.  Switch via URL (`?lang=fr`) or change language manually

------------------------------------------------------------------------

## ☁️ Google Sheets Integration

The form sends data to your Google Sheets through a public Apps Script
endpoint:

``` js
await fetch(GOOGLE_SCRIPT_URL, {
  method: "POST",
  body: formData,
  mode: "no-cors",
});
```

You must: 1. Create Google Sheet\
2. Add an Apps Script with `doPost(e)`\
3. Deploy as Web App\
4. Put final deployment URL inside `.env`\
`VITE_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/XXXX/exec"`

------------------------------------------------------------------------

## 🛠️ Styling

-   TailwindCSS is enabled inside `global.css`
-   Custom theme colors defined in `:root`
-   Components use:
    -   `glass-effect`
    -   `gradient-bg`
    -   `input-field`
    -   custom animations for leaves and floating elements

------------------------------------------------------------------------

## 📦 Deployment

You can host the built `dist/` folder on:

-   Netlify\
-   Vercel\
-   GitHub Pages\
-   Cloudflare Pages\
-   Any static hosting provider

``` bash
npm run build
```

Upload the **dist/** folder.

------------------------------------------------------------------------

## 📛 Project Name Suggestion

### **EcoLead Form**

(or)\
\### **GreenFlow Lead Capture**\
(or simplest)\
\### **Leafy Lead Form**

All match the green theme + lead collection idea.

------------------------------------------------------------------------

## 📄 License

MIT © 2025
