"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { CLUSTER, WALLETS } from "@/web3";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider endpoint={CLUSTER}>
          <WalletProvider wallets={WALLETS} autoConnect>
            <WalletModalProvider>
              <WalletMultiButton />
              <WalletDisconnectButton />
              {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
