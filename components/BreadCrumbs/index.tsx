"use client";
import { usePathname } from "next/navigation";
import React from "react";

interface IBreadCrumbs {}

function BreadCrumbs({}: IBreadCrumbs) {
  const paths = usePathname();
  return (
    <div>
      <p>{`home${paths}`}</p>
    </div>
  );
}
export default BreadCrumbs;
