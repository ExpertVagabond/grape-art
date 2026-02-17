# Grape Art — Revived

> **Solana Graveyard Hackathon Revival** | Track: Art ($5K)
>
> This fork brings the abandoned Grape Art NFT marketplace back to life on modern Solana tooling.
> See [MIGRATION.md](./MIGRATION.md) for the full technical migration guide.

### What's New

- Replaced `@project-serum/anchor` with `@coral-xyz/anchor` (0.30+)
- Updated `@solana/web3.js` from 1.34 to **1.95+**
- Updated Metaplex SDK to **v3+**, wallet-adapter to latest
- Removed **9 dead integrations** (CyberConnect, Shadow Drive, Strata, Streamflow, Dialect, etc.)
- Updated `@solana/spl-token` to modern version
- **400+ TypeScript files compile with zero errors**
- Production build via **Parcel 2.16.4** (98 files, 17MB dist)
- **746-line marketplace demo** validating 19 auction house operations
- **11 migration stories completed** (see MIGRATION.md)

### Quick Start

```bash
npm install
npm run build   # Parcel production build
npm start       # Parcel dev server with HMR
```

---

*Original README below:*

## Grape Art | Social. Stateless. Marketplace.

A full-featured NFT marketplace powered by Solana with Metaplex Auction House integration.

**Core Technologies:**
- Metaplex Auction House
- Solana Wallet Adapter
- MUI 5

**Build:**
```bash
npm install
npm start
```

**Screenshots:**

Profile:
<img width="1646" alt="Profile" src="https://user-images.githubusercontent.com/13381905/181996101-e4fc0d24-ad97-4586-899b-623dbf59a9d0.png">

Community Discovery:
<img width="1167" alt="Discovery" src="https://user-images.githubusercontent.com/13381905/181996003-bfbecba1-ae37-49e4-974a-9c19c869f48d.png">

Marketplace:
<img width="1204" alt="Marketplace" src="https://user-images.githubusercontent.com/13381905/181996036-e4e3a193-8e9d-4a66-ada1-a0719a5779e7.png">


