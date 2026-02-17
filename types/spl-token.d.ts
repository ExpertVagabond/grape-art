// Type augmentation for @solana/spl-token
// The package's export * chain is not resolved correctly by TypeScript
// These declarations fill in the missing exports

import { PublicKey, TransactionInstruction, Signer, Connection, Commitment, ConfirmOptions } from '@solana/web3.js';

declare module '@solana/spl-token' {
    // Instructions
    export function createBurnInstruction(
        account: PublicKey, mint: PublicKey, owner: PublicKey,
        amount: number | bigint, multiSigners?: (Signer | PublicKey)[], programId?: PublicKey
    ): TransactionInstruction;
    
    export function createCloseAccountInstruction(
        account: PublicKey, destination: PublicKey, authority: PublicKey,
        multiSigners?: (Signer | PublicKey)[], programId?: PublicKey
    ): TransactionInstruction;
    
    export function createTransferInstruction(
        source: PublicKey, destination: PublicKey, owner: PublicKey,
        amount: number | bigint, multiSigners?: (Signer | PublicKey)[], programId?: PublicKey
    ): TransactionInstruction;
    
    export function createAssociatedTokenAccountInstruction(
        payer: PublicKey, associatedToken: PublicKey, owner: PublicKey, mint: PublicKey,
        programId?: PublicKey, associatedTokenProgramId?: PublicKey
    ): TransactionInstruction;
    
    export function createApproveInstruction(
        account: PublicKey, delegate: PublicKey, owner: PublicKey,
        amount: number | bigint, multiSigners?: (Signer | PublicKey)[], programId?: PublicKey
    ): TransactionInstruction;
    
    export function createRevokeInstruction(
        account: PublicKey, owner: PublicKey,
        multiSigners?: (Signer | PublicKey)[], programId?: PublicKey
    ): TransactionInstruction;
    
    // Actions
    export function getAssociatedTokenAddress(
        mint: PublicKey, owner: PublicKey, allowOwnerOffCurve?: boolean,
        programId?: PublicKey, associatedTokenProgramId?: PublicKey
    ): Promise<PublicKey>;
    
    export function getOrCreateAssociatedTokenAccount(
        connection: Connection, payer: Signer, mint: PublicKey, owner: PublicKey,
        allowOwnerOffCurve?: boolean, commitment?: Commitment,
        confirmOptions?: ConfirmOptions, programId?: PublicKey,
        associatedTokenProgramId?: PublicKey
    ): Promise<any>;
    
    export function createAssociatedTokenAccount(
        connection: Connection, payer: Signer, mint: PublicKey, owner: PublicKey,
        confirmOptions?: ConfirmOptions, programId?: PublicKey,
        associatedTokenProgramId?: PublicKey
    ): Promise<PublicKey>;
    
    // State
    export function getMint(
        connection: Connection, address: PublicKey, commitment?: Commitment,
        programId?: PublicKey
    ): Promise<any>;
    
    export function getAccount(
        connection: Connection, address: PublicKey, commitment?: Commitment,
        programId?: PublicKey
    ): Promise<any>;
}
