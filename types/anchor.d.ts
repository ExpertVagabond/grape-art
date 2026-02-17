import "@coral-xyz/anchor";
declare module "@coral-xyz/anchor" {
  interface Program<IDL = any> {
    instruction: any;
    account: any;
    rpc: any;
  }
  const Provider: any;
}
