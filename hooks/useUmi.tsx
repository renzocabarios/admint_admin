"use client";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { Cluster, clusterApiUrl } from "@solana/web3.js";
import { NEXT_PUBLIC_CLUSTER } from "@/env";

function useUmi() {
  const wallet = useWallet();
  const umi = useMemo(
    () =>
      createUmi(
        (NEXT_PUBLIC_CLUSTER as Cluster) == "mainnet-beta"
          ? "https://api.metaplex.solana.com/"
          : clusterApiUrl(NEXT_PUBLIC_CLUSTER as Cluster)
      )
        .use(walletAdapterIdentity(wallet))
        .use(mplCandyMachine())
        .use(mplTokenMetadata()),
    [wallet]
  );
  return { umi };
}

export default useUmi;
