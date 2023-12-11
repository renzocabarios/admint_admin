import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

export const NETWORK = WalletAdapterNetwork.Devnet;
export const CLUSTER = clusterApiUrl(NETWORK);
export const WALLETS = [new UnsafeBurnerWalletAdapter()];
