# SPA Quick Finder

A fast navigation tool for the Speech Pathology Australia website. Search by keyword, browse categories, or use quick links to skip straight to the page you need.

## Deploy to Vercel

### Option 1: One-click (easiest)

1. Push this folder to a **GitHub repo**
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo → Vercel auto-detects Next.js → click **Deploy**

### Option 2: Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# From this project folder
vercel
```

Follow the prompts — it will deploy in ~60 seconds.

### Option 3: Drag & drop

```bash
npm install
npm run build
```

Then drag the `.next` output to [vercel.com/new](https://vercel.com/new).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customising

- **Add more pages**: Edit the `SPA_KNOWLEDGE` array in `app/page.js`
- **Add synonyms**: Edit the `SYNONYMS` object to improve search matching
- **Change quick links**: Edit the `QUICK_LINKS` array

## Tech

- Next.js 14 (App Router)
- Zero dependencies beyond React + Next
- No database needed — knowledge base is embedded
- Fully static, deploys to Vercel's edge network
