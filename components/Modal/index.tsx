import { useModalStore } from "@/states";
import React from "react";

interface IModal {}

function Modal({}: IModal) {
  const { isOpen } = useModalStore() as any;

  return (
    <>
      {isOpen ? (
        <div className="absolute top-0 bg-transparent h-screen w-screen flex justify-center items-center">
          <div className="bg-white p-5 opacity-100 rounded-md">
            <p>Don't close this website, currently minting NFT</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default Modal;
