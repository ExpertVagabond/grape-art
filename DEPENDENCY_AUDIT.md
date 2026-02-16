# Grape Art - Dependency Audit (GA-01)

**Date:** 2026-02-16
**Branch:** revival/graveyard-hack
**Source:** package.json v1.1.419

## Disposition Legend

- **KEEP** - Dependency is still maintained, widely used, and needed as-is
- **UPGRADE** - Dependency is needed but must be updated to a current version
- **REPLACE** - Dependency must be swapped for its successor package
- **REMOVE** - Dependency is dead, deprecated, or no longer needed
- **STUB** - Dependency will be removed but its API must be stubbed out first
- **EVALUATE** - Needs further investigation before deciding

---

## Dependencies

| Package | Current Version | Disposition | Notes |
|---------|----------------|-------------|-------|
| @apollo/client | 3.6.9 | UPGRADE | GraphQL client, still maintained. Upgrade to 3.x latest |
| @blockworks-foundation/voter-stake-registry-client | ^0.2.3 | EVALUATE | Governance-related, may not be needed for core NFT gallery |
| @bonfida/spl-name-service | 0.1.55 | UPGRADE | SNS name resolution, still active. Upgrade to latest |
| @cardinal/namespaces | ^4.1.56 | REMOVE | Cardinal Labs shut down. Replace with SNS or stub |
| @cardinal/token-manager | 2.0.0 | REMOVE | Cardinal Labs shut down. Stub any rental/escrow features |
| @certusone/wormhole-sdk | ^0.9.11 | REMOVE | Wormhole rebranded to @wormhole-foundation. Remove unless cross-chain is needed |
| @crossmint/connect | ^0.0.5-alpha-2 | EVALUATE | Crossmint fiat onramp, still active but alpha version. Upgrade if keeping |
| @cyberlab/cyberconnect | ^4.4.2 | REMOVE | CyberConnect social graph, project pivoted. Dead dependency |
| @dialectlabs/identity-cardinal | ^0.0.2 | REMOVE | Dialect identity integration, deprecated |
| @dialectlabs/identity-dialect-dapps | ^0.0.1 | REMOVE | Dialect identity integration, deprecated |
| @dialectlabs/identity-sns | ^0.0.2 | REMOVE | Dialect identity integration, deprecated |
| @dialectlabs/react | ^0.5.6 | REMOVE | Dialect messaging SDK, deprecated/rebranded |
| @dialectlabs/react-ui | ^1.0.0-beta.66 | REMOVE | Dialect UI components, deprecated/rebranded |
| @emotion/react | ^11.4.1 | KEEP | MUI peer dependency, still maintained |
| @emotion/styled | ^11.8.1 | KEEP | MUI peer dependency, still maintained |
| @hellomoon/api | ^1.17.4 | EVALUATE | HelloMoon analytics API, may be deprecated. Check status |
| @jup-ag/react-hook | ^2.0.0-beta.4 | UPGRADE | Jupiter swap hook. Upgrade to latest Jupiter SDK |
| @metaplex-foundation/mpl-auction-house | 1.2.0 | UPGRADE | Metaplex Auction House, deprecated in favor of mpl-bubblegum/core. Needs migration plan |
| @metaplex-foundation/mpl-core | 0.6.1 | UPGRADE | Metaplex Core, upgrade to latest |
| @metaplex-foundation/mpl-token-metadata | 2.1.1 | UPGRADE | Metaplex Token Metadata, upgrade to latest v3.x |
| @metaplex/js | ^4.12.0 | REMOVE | Old Metaplex JS SDK, fully replaced by @metaplex-foundation packages |
| @mui/icons-material | ^5.14.3 | UPGRADE | MUI icons, upgrade to 5.x latest or evaluate MUI 6 |
| @mui/lab | ^5.0.0-alpha.139 | UPGRADE | MUI lab components, upgrade with MUI core |
| @mui/material | ^5.14.4 | UPGRADE | MUI core, upgrade to 5.x latest or evaluate MUI 6 migration |
| @mui/x-data-grid | ^5.17.26 | UPGRADE | MUI data grid, upgrade to 6.x or 7.x |
| @project-serum/anchor | 0.24.2 | REPLACE | **Replace with @coral-xyz/anchor** (Project Serum rebranded to Coral) |
| @project-serum/common | ^0.0.1-beta.3 | REMOVE | Dead package from Project Serum, inline any needed utilities |
| @react-native-async-storage/async-storage | ^1.15.17 | EVALUATE | React Native package in a web app - likely dead code. Remove if web-only |
| @shadow-drive/sdk | ^3.3.0 | REMOVE | Shadow Drive / GenesysGo, deprecated storage solution |
| @solana/buffer-layout | ^4.0.0 | KEEP | Low-level Solana buffer layout, still maintained |
| @solana/spl-governance | ^0.3.27 | EVALUATE | SPL Governance client, only needed if governance features are kept |
| @solana/spl-token | ^0.3.7 | UPGRADE | SPL Token library, upgrade to latest |
| @solana/spl-token-registry | ^0.2.4432 | REMOVE | Deprecated token registry, replaced by Metaplex/Jupiter token list |
| @solana/spl-token-v2 | npm:@solana/spl-token@0.2.0 | REMOVE | Aliased old version, consolidate to single spl-token |
| @solana/wallet-adapter-base | ^0.9.22 | UPGRADE | Wallet adapter base, upgrade to latest |
| @solana/wallet-adapter-material-ui | ^0.16.30 | UPGRADE | MUI wallet adapter, upgrade to latest |
| @solana/wallet-adapter-react | ^0.15.32 | UPGRADE | Wallet adapter React hooks, upgrade to latest |
| @solana/wallet-adapter-react-ui | ^0.9.31 | UPGRADE | Wallet adapter UI, upgrade to latest |
| @solana/wallet-adapter-wallets | ^0.19.16 | UPGRADE | Wallet adapter wallets bundle, upgrade to latest |
| @solana/web3.js | ^1.91.6 | UPGRADE | Core Solana web3, upgrade to latest 1.x (evaluate 2.x migration later) |
| @solflare-wallet/pfp | ^0.0.6 | REMOVE | Solflare PFP integration, likely dead/unused |
| @sqds/iframe-adapter | ^1.0.16 | EVALUATE | Squads multisig iframe adapter, keep if multisig needed |
| @sqds/sdk | ^1.0.4 | EVALUATE | Squads SDK, keep if multisig features needed |
| @strata-foundation/react | ^3.11.2 | REMOVE | Strata Protocol shut down. Dead dependency |
| @strata-foundation/spl-token-bonding | ^3.11.2 | REMOVE | Strata Protocol shut down. Dead dependency |
| @strata-foundation/spl-token-collective | ^3.11.2 | REMOVE | Strata Protocol shut down. Dead dependency |
| @streamflow/stream | ^3.0.19 | EVALUATE | Streamflow token vesting, still active. Keep if vesting features needed |
| @testing-library/jest-dom | ^5.16.4 | KEEP | Testing utility, still maintained |
| @testing-library/react | ^13.4.0 | UPGRADE | Testing library, upgrade to 14.x+ |
| @types/react-copy-to-clipboard | ^5.0.3 | KEEP | Type definitions |
| @types/react-helmet | ^6.1.6 | KEEP | Type definitions |
| @types/react-router-dom | ^5.1.6 | REMOVE | Not needed with react-router v6 (ships own types) |
| @vercel/analytics | ^0.1.11 | UPGRADE | Vercel analytics, upgrade to latest |
| add | ^2.0.6 | REMOVE | Likely accidental install (someone ran `yarn add add`) |
| axios | ^1.3.6 | UPGRADE | HTTP client, upgrade to latest 1.x |
| bignumber.js | ^9.1.1 | KEEP | Arbitrary precision math, still maintained |
| bn.js | ^5.1.3 | KEEP | BigNumber for Solana, peer dependency for many packages |
| borsh | ^0.7.0 | KEEP | Borsh serialization for Solana, still maintained |
| bs58 | ^5.0.0 | KEEP | Base58 encoding, still maintained |
| color | ^4.2.3 | KEEP | Color manipulation utility |
| commander | ^8.3.0 | EVALUATE | CLI framework - odd in a web app. May be used for scripts |
| ethers | ^5.5.4 | EVALUATE | Ethereum library - only needed if cross-chain (Wormhole). Remove if removing Wormhole |
| file_size_url | ^1.0.4 | EVALUATE | URL file size checker, very small package |
| formidable | v3 | EVALUATE | File upload parsing, server-side only. Check if used |
| fp-ts | ^2.12.3 | EVALUATE | Functional programming library, check usage scope |
| grape-art-listing-request | ^0.0.29 | EVALUATE | Grape-specific listing request package. Check if still published/needed |
| graphql | ^16.6.0 | KEEP | GraphQL core, peer dependency for @apollo/client |
| graphql-request | ^4.3.0 | KEEP | Lightweight GraphQL client |
| i18next | ^21.8.2 | UPGRADE | i18n framework, upgrade to latest |
| i18next-browser-languagedetector | ^6.1.4 | UPGRADE | i18n browser detection, upgrade to latest |
| i18next-http-backend | ^1.4.0 | UPGRADE | i18n HTTP backend, upgrade to latest |
| jsbi | ^4.3.0 | KEEP | BigInt polyfill, may not be needed for modern browsers |
| lodash-es | ^4.17.21 | KEEP | Lodash ES modules, still maintained |
| loglevel | ^1.8.0 | KEEP | Lightweight logging |
| moment | ^2.29.4 | EVALUATE | Consider replacing with date-fns or dayjs (moment is in maintenance mode) |
| notistack | ^2.0.4 | UPGRADE | Snackbar notifications for MUI, upgrade to 3.x |
| prop-types | ^15.7.2 | REMOVE | Not needed with TypeScript |
| ramda | ^0.28.0 | EVALUATE | FP utility library, check usage scope vs lodash-es |
| react | ^18.2.0 | KEEP | Core React |
| react-blur | ^1.1.1 | EVALUATE | Blur effect component, check if still maintained |
| react-copy-to-clipboard | ^5.0.4 | KEEP | Clipboard utility, still maintained |
| react-countdown-circle-timer | ^3.1.0 | KEEP | Timer component, still maintained |
| react-dom | ^18.2.0 | KEEP | Core React DOM |
| react-dom-confetti | ^0.2.0 | KEEP | Confetti animation |
| react-gist | ^1.2.4 | EVALUATE | GitHub Gist embed, check if used |
| react-helmet | ^6.1.0 | REMOVE | Replaced by react-helmet-async (both present) |
| react-helmet-async | ^1.3.0 | KEEP | Async-safe document head management |
| react-hot-loader | ^4.13.1 | REMOVE | Not needed with Parcel HMR |
| react-i18next | ^12.0.0 | UPGRADE | React i18n bindings, upgrade to latest |
| react-infinite-scroll-component | ^6.1.0 | KEEP | Infinite scroll, still maintained |
| react-jazzicon | ^1.0.3 | KEEP | Wallet address identicon |
| react-markdown | ^8.0.3 | KEEP | Markdown renderer |
| react-material-file-upload | ^0.0.4 | EVALUATE | MUI file upload, check if maintained |
| react-qr-code | ^2.0.11 | KEEP | QR code generator |
| react-query | ^4.0.0 | REPLACE | Renamed to @tanstack/react-query. Replace |
| react-router | ^6.4.3 | UPGRADE | React Router, upgrade to 6.x latest |
| react-router-dom | ^6.4.3 | UPGRADE | React Router DOM, upgrade to 6.x latest |
| react-scripts | ^5.0.1 | REMOVE | CRA scripts, not needed with Parcel bundler |
| react-share | ^4.4.1 | KEEP | Social share buttons |
| react-simple-image-viewer | ^1.1.1 | KEEP | Image lightbox viewer |
| react-xnft | ^0.2.0-latest.1405 | REMOVE | xNFT (Backpack) SDK, project deprecated |
| remark-gfm | ^3.0.1 | KEEP | GitHub Flavored Markdown plugin |
| rimraf | ^3.0.2 | KEEP | Cross-platform rm -rf |
| tweetnacl | ^1.0.3 | KEEP | Crypto library, used by Solana |
| web-vitals | ^1.1.2 | KEEP | Web performance metrics |
| web3modal | ^1.9.5 | EVALUATE | WalletConnect modal for EVM - only needed if keeping Ethereum/Wormhole |
| weighted | ^1.0.0 | EVALUATE | Weighted random selection, check usage |
| yarn | ^1.22.19 | REMOVE | Yarn as a dependency is wrong. Remove |
| zustand | ^3.6.8 | UPGRADE | State management, upgrade to 4.x or 5.x |

## Dev Dependencies

| Package | Current Version | Disposition | Notes |
|---------|----------------|-------------|-------|
| @coral-xyz/xnft-cli | 0.2.0-latest.1405 | REMOVE | xNFT CLI, project deprecated (Backpack) |
| @parcel/compressor-brotli | 2.8.0 | UPGRADE | Parcel plugin, upgrade with Parcel |
| @parcel/compressor-gzip | 2.8.0 | UPGRADE | Parcel plugin, upgrade with Parcel |
| @parcel/packager-raw-url | 2.8.0 | UPGRADE | Parcel plugin, upgrade with Parcel |
| @parcel/resolver-glob | 2.8.0 | UPGRADE | Parcel plugin, upgrade with Parcel |
| @parcel/transformer-less | 2.8.0 | UPGRADE | Parcel plugin, upgrade with Parcel |
| @parcel/transformer-webmanifest | 2.8.0 | UPGRADE | Parcel plugin, upgrade with Parcel |
| @types/bn.js | ^5.1.1 | KEEP | Type definitions for bn.js |
| @types/bs58 | ^4.0.1 | KEEP | Type definitions for bs58 |
| @types/eslint | ^8.2.2 | KEEP | Type definitions |
| @types/eslint-plugin-prettier | ^3.1.0 | KEEP | Type definitions |
| @types/jest | ^24.9.1 | UPGRADE | Jest types, upgrade to latest |
| @types/node | ^17.0.17 | UPGRADE | Node types, upgrade to latest |
| @types/prettier | ^2.4.3 | KEEP | Type definitions |
| @types/react-dom | ^17.0.0 | UPGRADE | React DOM types, upgrade to match React 18 |
| @typescript-eslint/eslint-plugin | ^5.36.2 | UPGRADE | ESLint TS plugin, upgrade to 6.x+ |
| @typescript-eslint/parser | ^5.36.2 | UPGRADE | ESLint TS parser, upgrade to 6.x+ |
| autoprefixer | ^10.4.7 | KEEP | CSS autoprefixer |
| babel-eslint | ^10.1.0 | REMOVE | Deprecated, replaced by @babel/eslint-parser |
| babel-plugin-dynamic-import-node | ^2.3.3 | EVALUATE | May not be needed with Parcel |
| browserify-zlib | ^0.2.0 | KEEP | Node polyfill for browser |
| buffer | ^5.5.0 | UPGRADE | Buffer polyfill, upgrade to 6.x |
| concurrently | ^6.1.0 | KEEP | Run multiple commands |
| cross-env | ^7.0.3 | KEEP | Cross-platform env vars |
| crypto-browserify | ^3.12.0 | KEEP | Node crypto polyfill for browser |
| eslint | ^8.15.0 | UPGRADE | ESLint, upgrade to 9.x (flat config) |
| eslint-config-prettier | ^8.5.0 | UPGRADE | Prettier ESLint config, upgrade with ESLint |
| eslint-plugin-prettier | ^4.0.0 | UPGRADE | Prettier ESLint plugin, upgrade with ESLint |
| eslint-plugin-react | ^7.29.3 | UPGRADE | React ESLint plugin |
| eslint-plugin-react-hooks | ^4.3.0 | UPGRADE | React Hooks ESLint plugin |
| gh-pages | ^3.1.0 | KEEP | GitHub Pages deployment |
| https-browserify | ^1.0.0 | KEEP | Node HTTPS polyfill for browser |
| nodemon | ^2.0.7 | KEEP | Dev server auto-restart |
| os-browserify | ^0.3.0 | KEEP | Node OS polyfill for browser |
| parcel | 2.8.0 | UPGRADE | Bundler, upgrade to latest 2.x |
| path-browserify | ^1.0.1 | KEEP | Node path polyfill for browser |
| prettier | ^2.5.1 | UPGRADE | Code formatter, upgrade to 3.x |
| querystring-es3 | ^0.2.1 | KEEP | Querystring polyfill |
| react-snap | ^1.23.0 | EVALUATE | Pre-rendering, may be unmaintained. Check if needed |
| shx | ^0.3.4 | KEEP | Cross-platform shell commands for npm scripts |
| stream-http | ^3.2.0 | KEEP | Node HTTP polyfill for browser |
| tslib | ^2.3.1 | KEEP | TypeScript runtime helpers |
| url | ^0.11.0 | KEEP | Node URL polyfill for browser |
| util | ^0.12.4 | KEEP | Node util polyfill for browser |

## Summary

### Counts by Disposition

| Disposition | Count |
|-------------|-------|
| REMOVE | 25 |
| UPGRADE | 33 |
| KEEP | 36 |
| REPLACE | 2 |
| EVALUATE | 17 |

### Critical Removals (Dead Projects)
- **@dialectlabs/*** (5 packages) - Dialect deprecated/rebranded
- **@strata-foundation/*** (3 packages) - Strata Protocol shut down
- **@cardinal/*** (2 packages) - Cardinal Labs shut down
- **@cyberlab/cyberconnect** - CyberConnect pivoted away
- **@shadow-drive/sdk** - GenesysGo Shadow Drive deprecated
- **@certusone/wormhole-sdk** - Rebranded to @wormhole-foundation
- **@solflare-wallet/pfp** - Dead integration
- **react-xnft** / **@coral-xyz/xnft-cli** - Backpack xNFT deprecated
- **@metaplex/js** - Old SDK, replaced by foundation packages

### Critical Replacements
- **@project-serum/anchor** -> **@coral-xyz/anchor** (Project Serum -> Coral rebrand)
- **react-query** -> **@tanstack/react-query** (package renamed)

### Priority Upgrades
1. @solana/web3.js (core dependency)
2. @solana/spl-token (core dependency)
3. @solana/wallet-adapter-* (wallet connectivity)
4. @metaplex-foundation/* (NFT functionality)
5. @coral-xyz/anchor (replacement for @project-serum/anchor)
6. zustand (state management)
7. MUI packages (UI framework)
8. Parcel + plugins (bundler)
