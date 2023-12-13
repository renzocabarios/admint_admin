"use client";
import { Button, FormInput } from "@/components";
import { get, patch } from "@/config";
import useUmi from "@/hooks/useUmi";
import { useParticipantStore } from "@/states";
import { parseDate } from "@/utils";
import { mint } from "@/web3";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { participants, fetchParticipants, sendNft } =
    useParticipantStore() as any;
  const params = useParams();
  const { umi } = useUmi();
  const [search, setsearch] = useState("");

  const handleChange = (e: any) => {
    setsearch(e.target.value);
  };
  const filtered = useMemo(() => {
    if (search != "") {
      const name = participants.filter((e: any) => e.name.includes(search));
      const email = participants.filter((e: any) => e.email.includes(search));
      const walletId = participants.filter((e: any) =>
        e.walletId.includes(search)
      );
      return [...new Set<any>([...name, ...email, ...walletId])];
    }
    return participants;
  }, [participants, search]);

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
      <div className="py-2 flex justify-between items-center w-full">
        <FormInput
          title="Search participants"
          onChange={handleChange}
        ></FormInput>
      </div>
      <div className=" flex flex-col gap-2">
        {filtered.map((e: any) => {
          return (
            <div
              key={e._id}
              className={`p-3 ${
                e.received ? "bg-slate-500" : "bg-green-500"
              }  rounded-md flex items-center justify-between`}
            >
              <div className="flex flex-col">
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
