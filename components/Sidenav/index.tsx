"use client";
import { useRouter } from "next/navigation";
import React from "react";
import style from "./style.module.css";
interface ISidenav {}

function Sidenav({}: ISidenav) {
  const router = useRouter();
  return (
    <div className={style.sidenav}>
      <p
        onClick={() => {
          router.push("/users");
        }}
      >
        Users
      </p>
      <p
        onClick={() => {
          router.push("/events");
        }}
      >
        Events
      </p>
      <p
        onClick={() => {
          router.push("/participants");
        }}
      >
        Participants
      </p>
    </div>
  );
}
export default Sidenav;
