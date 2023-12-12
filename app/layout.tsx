"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { CLUSTER, WALLETS } from "@/web3";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
require("@solana/wallet-adapter-react-ui/styles.css");
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setmounted] = useState(false);
  useEffect(() => {
    setmounted(true);
  }, [mounted]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider endpoint={CLUSTER}>
          <WalletProvider wallets={WALLETS} autoConnect>
            <WalletModalProvider>
              <WalletMultiButton />
              {mounted ? children : <></>}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
