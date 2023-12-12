import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import {
  generateSigner,
  transactionBuilder,
  publicKey,
  Umi,
} from "@metaplex-foundation/umi";
import {
  fetchCandyMachine,
  mintV2,
  safeFetchCandyGuard,
} from "@metaplex-foundation/mpl-candy-machine";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import * as bs58 from "bs58";
import { NEXT_PUBLIC_CANDY_MACHINE } from "@/env";

export const NETWORK = WalletAdapterNetwork.Devnet;
export const CLUSTER = clusterApiUrl(NETWORK);
export const CONNECTION = new Connection(CLUSTER);
export const WALLETS = [new UnsafeBurnerWalletAdapter()];

export const mint = async (umi: Umi) => {
  const candyMachine = await fetchCandyMachine(
    umi,
    publicKey(NEXT_PUBLIC_CANDY_MACHINE)
  );

  const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
  const nftMint = generateSigner(umi);

  const transaction = await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
    .add(
      mintV2(umi, {
        candyMachine: candyMachine.publicKey,
        nftMint,
        candyGuard: candyGuard?.publicKey,
        collectionMint: candyMachine.collectionMint,
        collectionUpdateAuthority: candyMachine.authority,
      })
    );
  const { signature } = await transaction.sendAndConfirm(umi, {
    confirm: { commitment: "finalized" },
  });

  return { tx: bs58.encode(signature), mintKey: nftMint.publicKey };
};
