"use client";
import { useRouter } from "next/navigation";
import React from "react";
import style from "./style.module.css";
interface ISidenav {}
interface ISidenavLinks {
  title: string;
  route: string;
}

function Sidenav({}: ISidenav) {
  const links: ISidenavLinks[] = [
    { title: "Users", route: "/users" },
    { title: "Events", route: "/events" },
    { title: "Participants", route: "/participants" },
  ];
  const router = useRouter();
  return (
    <div className={style.sidenav}>
      {links.map((link: ISidenavLinks) => (
        <p
          key={link.title}
          onClick={() => {
            router.push(link.route);
          }}
        >
          {link.title}
        </p>
      ))}
    </div>
  );
}
export default Sidenav;
