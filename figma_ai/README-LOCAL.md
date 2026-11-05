# Run Figma Make export on localhost

## One-time setup

```bash
cd /Users/willcsh/Desktop/HTHK_Intranet/figma_ai

# Vite expects config at .figma/make/ (Figma exports figma/make/)
mkdir -p .figma
ln -sf ../figma/make .figma/make

npm install
```

## Start dev server

```bash
npm run dev:local
```

Vite listens on **all interfaces** (`0.0.0.0`):

- **This machine:** http://localhost:5173/ or http://127.0.0.1:5173/
- **Same Wi‑Fi / LAN:** http://YOUR_LAN-IP:5173/ (run `ipconfig getifaddr en0` on Mac)

Default Figma Make port is **8443** (`npm run dev`), also reachable on LAN when using that script.

If another device cannot connect, allow incoming connections for Node in the macOS firewall.

## Production preview

```bash
npm run build
npm run preview
```

## Stack

- React 19 + Vite 8 + Tailwind CSS v4
- Entry: `src/main.tsx` → `src/App.tsx`
