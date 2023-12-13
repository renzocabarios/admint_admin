"use client";
import { Button } from "@/components";
import { get, patch } from "@/config";
import useUmi from "@/hooks/useUmi";
import { useParticipantStore } from "@/states";
import { parseDate } from "@/utils";
import { mint } from "@/web3";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { participants, fetchParticipants, sendNft } =
    useParticipantStore() as any;
  const params = useParams();
  const { umi } = useUmi();

  useEffect(() => {
    const start = async () => {
      const temp = await get(`participants?find={"event":"${params.id}"}`);
      if (temp.status == "success") fetchParticipants(temp.data);
    };
    start();
  }, [participants]);

  const mintNft = async (_id: string) => {
    try {
      const { tx, mintKey } = await mint(umi);
      await mintTo(_id, mintKey);
      await sendTo(_id);
      sendNft(_id);
      alert(`${tx} ${mintKey}`);
    } catch (error: any) {
      alert(error);
    }
  };

  const mintTo = async (_id: string, mintKey: string) => {
    try {
      const temp = await patch(`participants/${_id}/mint`, {
        nft: mintKey,
      });
      console.log(temp);
    } catch (error: any) {
      alert(error);
    }
  };

  const sendTo = async (_id: string) => {
    try {
      const temp = await patch(`participants/${_id}/send`, {});
      console.log(temp);
    } catch (error: any) {
      alert(error);
    }
  };

  return (
    <main>
      <div className="p-3 flex flex-col gap-2">
        {participants.map((e: any) => {
          return (
            <div
              key={e._id}
              className={`p-3 ${
                e.received ? "bg-gray-500" : "bg-green-500"
              }  rounded-md flex items-center justify-between`}
            >
              <div className="flex flex-col gap-2">
                <p>{e.name}</p>
                <p>{e.email}</p>
                <p>{e.walletId}</p>
                <p>Joined: {`${parseDate(e.createdAt)}`}</p>
              </div>
              <Button
                onClick={() => {
                  mintNft(e._id);
                }}
                disabled={e.received}
              >
                {e.received ? "Completed" : "Mint NFT"}
              </Button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
