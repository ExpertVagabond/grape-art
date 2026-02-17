#!/usr/bin/env node

/**
 * Post-install script to patch node_modules for Parcel compatibility.
 *
 * Parcel 2.16.4 performs ESM named export validation and uses the `browser`
 * field from package.json. Some older Solana ecosystem packages have browser
 * builds that are missing exports expected by their consumers.
 *
 * This script patches those missing exports so Parcel can build successfully.
 */

const fs = require('fs');
const path = require('path');

const patches = [
  {
    // @project-serum/anchor browser build missing 'Wallet' export
    // Used by: @cardinal/common/src/workspace.ts
    files: [
      'node_modules/@project-serum/anchor/dist/browser/index.js',
      'node_modules/@cardinal/payment-manager/node_modules/@project-serum/anchor/dist/browser/index.js',
      'node_modules/@cardinal/namespaces/node_modules/@project-serum/anchor/dist/browser/index.js',
    ],
    marker: '/* PATCHED: Wallet export */',
    patch: `
/* PATCHED: Wallet export */
class Wallet {
  constructor(payer) {
    this.payer = payer;
    this.publicKey = payer && payer.publicKey;
  }
  async signTransaction(tx) { return tx; }
  async signAllTransactions(txs) { return txs; }
}
export { Wallet };
`,
  },
];

let patchCount = 0;

for (const p of patches) {
  for (const file of p.files) {
    const fullPath = path.resolve(__dirname, '..', file);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(p.marker)) {
      console.log(`  [skip] ${file} (already patched)`);
      continue;
    }

    fs.writeFileSync(fullPath, content + '\n' + p.patch);
    console.log(`  [patch] ${file}`);
    patchCount++;
  }
}

console.log(`Patched ${patchCount} file(s) for Parcel compatibility.`);
