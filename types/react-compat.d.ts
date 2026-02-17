import "react";
declare module "react" {
  export type JSXElementConstructor<P> = ((props: P) => any) | (new (props: P) => any);
}
