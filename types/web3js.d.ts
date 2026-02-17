import { Commitment, TransactionSignature, ParsedTransactionWithMeta } from "@solana/web3.js";
declare module "@solana/web3.js" {
  export type TransactionVersion = "legacy" | 0;
  export class VersionedTransaction {
    signatures: Uint8Array[];
    message: any;
    constructor(message: any, signatures?: Uint8Array[]);
    serialize(): Uint8Array;
    static deserialize(serializedTransaction: Uint8Array): VersionedTransaction;
  }

  interface BlockhashWithExpiryBlockHeight { blockhash: string; lastValidBlockHeight: number; }
  interface TransactionConfirmationStrategy { blockhash: string; lastValidBlockHeight: number; signature: string; }
  interface Connection {
    getLatestBlockhash(c?: Commitment | any): Promise<BlockhashWithExpiryBlockHeight>;
    confirmTransaction(s: TransactionConfirmationStrategy, c?: Commitment): Promise<any>;
    getParsedTransaction(s: TransactionSignature, c?: any): Promise<ParsedTransactionWithMeta | null>;
    getParsedTransactions(s: any[], c?: any): Promise<any[]>;
    getParsedResponse(m: string, ...a: any[]): Promise<any>;
  }
}
