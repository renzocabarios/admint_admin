"use client";
import { useRouter } from "next/navigation";
import React from "react";
import style from "./style.module.css";
import { AiFillAlert } from "react-icons/ai";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
interface ISidenav {}
interface ISidenavLinks {
  title: string;
  route: string;
}

function Sidenav({}: ISidenav) {
  const links: ISidenavLinks[] = [
    // { title: "Users", route: "/users" },
    { title: "Events", route: "/events" },
    // { title: "Participants", route: "/participants" },
  ];
  const router = useRouter();
  return (
    <div className={style.sidenav}>
      <div className="w-full flex justify-center">
        <WalletMultiButton />
      </div>
      {links.map((link: ISidenavLinks) => (
        <div key={link.title} className="flex gap-2 items-center">
          <AiFillAlert size={30} />
          <p
            onClick={() => {
              router.push(link.route);
            }}
          >
            {link.title}
          </p>
        </div>
      ))}
    </div>
  );
}
export default Sidenav;
