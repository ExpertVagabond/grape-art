/**
 * Shim for @mercurial-finance/optimist
 *
 * This package imports `u64` and `Token` from @solana/spl-token v0.1.x/0.2.x,
 * which no longer exist in v0.3.x. Since the functions in this module are only
 * used at runtime for Jupiter swap internals, we re-export the original module
 * but provide stub implementations for the missing imports so Parcel's
 * packageExports validation passes.
 *
 * The actual @mercurial-finance/optimist ESM bundle is inlined below with
 * patched imports.
 */

import promiseRetry from 'promise-retry';
import { AccountLayout, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createCloseAccountInstruction, createSyncNativeInstruction } from '@solana/spl-token';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import BN from 'bn.js';

// Shim u64 (was a BN subclass in spl-token 0.1.x)
class u64 extends BN {
  static fromBuffer(buffer) {
    return new u64(buffer, 'le');
  }
}

// Shim Token static methods (were on the Token class in spl-token 0.1.x)
const Token = {
  getAssociatedTokenAddress(associatedProgramId, tokenProgramId, mint, owner) {
    return getAssociatedTokenAddress(mint, owner, false, tokenProgramId, associatedProgramId);
  },
  createAssociatedTokenAccountInstruction(associatedProgramId, tokenProgramId, mint, account, owner, payer) {
    return createAssociatedTokenAccountInstruction(payer, account, owner, mint, tokenProgramId, associatedProgramId);
  },
  createCloseAccountInstruction(tokenProgramId, account, dest, authority, multiSigners) {
    return createCloseAccountInstruction(account, dest, authority, multiSigners, tokenProgramId);
  },
  createSyncNativeInstruction(tokenProgramId, account) {
    return createSyncNativeInstruction(account, tokenProgramId);
  },
};

class TransactionError extends Error {
  constructor(m, txid, code) {
    super(m);
    this.txid = txid;
    this.code = code;
    Object.setPrototypeOf(this, Error.prototype);
  }
}

const UNKNOWN_ERROR = 'Unknown error, visit the explorer';
const SYSTEM_PROGRAM_ID = '11111111111111111111111111111111';

function parseErrorForTransaction(tx) {
  const errors = [];
  if (tx?.meta?.logMessages) {
    tx.meta.logMessages.forEach(log => {
      const regex = /Error: (.*)/gm;
      let m;
      while ((m = regex.exec(log)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;
        if (m.length > 1) errors.push(m[1]);
      }
    });
  }
  if (errors.length > 0) return { message: errors.join(',') };

  const transactionError = tx?.meta?.err;
  JSON.stringify(transactionError);
  let errorCode;
  if (transactionError && typeof transactionError !== 'string') {
    const instructionError = transactionError.InstructionError;
    const [index, { Custom }] = instructionError;
    errorCode = Custom;
    if (tx?.meta?.logMessages) {
      const failedProgramId = getFailedProgram(tx.meta.logMessages, errorCode);
      if (failedProgramId) {
        if (failedProgramId === SYSTEM_PROGRAM_ID) return getSystemProgramError(instructionError);
        return { message: UNKNOWN_ERROR, programId: failedProgramId, code: errorCode };
      }
    }
  }
  return { message: typeof transactionError === 'string' ? transactionError : UNKNOWN_ERROR, code: errorCode };
}

function getFailedProgram(logMessages, errorCode) {
  for (let i = 0; i < logMessages.length; i++) {
    const found = logMessages[i].match(new RegExp(`Program ([1-9A-HJ-NP-Za-km-z]{32,44}) failed: custom program error: 0x${errorCode.toString(16)}`));
    if (found) return found[1];
  }
}

function getSystemProgramError(instructionError) {
  const code = instructionError[1].Custom;
  let message = '';
  switch (code) {
    case 0: message = 'An account with the same address already exists';
    case 1: message = 'The account does not have enough SOL to perform the operation';
    default: message = UNKNOWN_ERROR;
  }
  return { code, programId: SYSTEM_PROGRAM_ID, message };
}

async function pollForConfirmedTransaction(connection, txid) {
  return promiseRetry(async retry => {
    const response = await connection.getTransaction(txid, { commitment: 'confirmed' });
    if (!response) retry(new TransactionError('Transaction was not confirmed', txid));
    return response;
  }, { retries: 30, minTimeout: 500 }).catch(() => null);
}

const deserializeAccount = data => {
  if (data == undefined || data.length == 0) return undefined;
  const accountInfo = AccountLayout.decode(data);
  accountInfo.mint = new PublicKey(accountInfo.mint);
  accountInfo.owner = new PublicKey(accountInfo.owner);
  accountInfo.amount = u64.fromBuffer(accountInfo.amount);
  if (accountInfo.delegateOption === 0) {
    accountInfo.delegate = null;
    accountInfo.delegatedAmount = new u64(0);
  } else {
    accountInfo.delegate = new PublicKey(accountInfo.delegate);
    accountInfo.delegatedAmount = u64.fromBuffer(accountInfo.delegatedAmount);
  }
  accountInfo.isInitialized = accountInfo.state !== 0;
  accountInfo.isFrozen = accountInfo.state === 2;
  if (accountInfo.isNativeOption === 1) {
    accountInfo.rentExemptReserve = u64.fromBuffer(accountInfo.isNative);
    accountInfo.isNative = true;
  } else {
    accountInfo.rentExemptReserve = null;
    accountInfo.isNative = false;
  }
  if (accountInfo.closeAuthorityOption === 0) {
    accountInfo.closeAuthority = null;
  } else {
    accountInfo.closeAuthority = new PublicKey(accountInfo.closeAuthority);
  }
  return accountInfo;
};

const SOL_MINT = 'So11111111111111111111111111111111111111112';

async function getWSolATA(connection, publicKey) {
  const wSolAddress = await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, new PublicKey(SOL_MINT), publicKey);
  const accountInfo = await connection.getAccountInfo(wSolAddress);
  return { address: wSolAddress, accountInfo };
}

async function createAndTransferWSOLInstructions(connection, publicKey, amountToTransferInLamports) {
  const wSolAccount = await getWSolATA(connection, publicKey);
  const instructions = [];
  if (!wSolAccount.accountInfo) {
    instructions.push(Token.createAssociatedTokenAccountInstruction(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, new PublicKey(SOL_MINT), wSolAccount.address, publicKey, publicKey));
  }
  instructions.push(SystemProgram.transfer({ fromPubkey: publicKey, toPubkey: wSolAccount.address, lamports: amountToTransferInLamports }));
  instructions.push(Token.createSyncNativeInstruction(TOKEN_PROGRAM_ID, wSolAccount.address));
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  const transaction = new Transaction({ feePayer: publicKey, blockhash, lastValidBlockHeight });
  transaction.add(...instructions);
  return transaction;
}

async function createUnwrapSolInstructions(connection, publicKey) {
  const wSolAccount = await getWSolATA(connection, publicKey);
  const instructions = [];
  if (!wSolAccount.accountInfo) return;
  instructions.push(Token.createCloseAccountInstruction(TOKEN_PROGRAM_ID, wSolAccount.address, publicKey, publicKey, []));
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  const transaction = new Transaction({ feePayer: publicKey, blockhash, lastValidBlockHeight });
  transaction.add(...instructions);
  return transaction;
}

export { TransactionError, UNKNOWN_ERROR, createAndTransferWSOLInstructions, createUnwrapSolInstructions, deserializeAccount, parseErrorForTransaction, pollForConfirmedTransaction };
