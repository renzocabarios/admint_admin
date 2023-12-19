"use client";
import { Button, FormInput } from "@/components";
import { get, patch, remove } from "@/config";
import useUmi from "@/hooks/useUmi";
import { useEventStore, useModalStore, useParticipantStore } from "@/states";
import { parseDate } from "@/utils";
import { mint } from "@/web3";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { participants, fetchParticipants, sendNft } =
    useParticipantStore() as any;
  const { events, fetchEvents } = useEventStore() as any;

  const params = useParams();
  const { umi } = useUmi();
  const [search, setsearch] = useState("");
  const { toggleOpen } = useModalStore() as any;
  const handleChange = (e: any) => {
    setsearch(e.target.value);
  };

  const filtered = useMemo(() => {
    let temp = [...participants];
    if (search != "") {
      const name = participants.filter((e: any) => e.name.includes(search));
      const email = participants.filter((e: any) => e.email.includes(search));
      const walletId = participants.filter((e: any) =>
        e.walletId.includes(search)
      );
      temp = [...new Set<any>([...name, ...email, ...walletId])];
    }
    const received = temp.filter((e: any) => e.received);
    const notReceived = temp.filter((e: any) => !e.received);

    return [...received, ...notReceived];
  }, [participants, search, fetchParticipants, params.id]);

  useEffect(() => {
    const start = async () => {
      const response = await get(`events/${params.id}`);
      if (response.status == "success") fetchEvents(response.data);

      const temp = await get(`participants?find={"event":"${params.id}"}`);
      if (temp.status == "success") fetchParticipants(temp.data);
    };
    start();
  }, [participants]);

  const mintNft = async (_id: string) => {
    toggleOpen();
    try {
      const { tx, mintKey } = await mint(umi, events[0].candyMachine);
      await mintTo(_id, mintKey);
      await sendTo(_id);
      sendNft(_id);
    } catch (error: any) {
      alert(error);
    }
    toggleOpen();
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
  const deleteParticipant = async (_id: string) => {
    try {
      const temp = await remove(`participants/${_id}`);
      console.log(temp);
    } catch (error: any) {
      alert(error);
    }
  };

  deleteParticipant;
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

              <div className="flex items-center">
                <Button
                  onClick={() => {
                    mintNft(e._id);
                  }}
                  disabled={e.received}
                >
                  {e.received ? "Completed" : "Mint NFT"}
                </Button>

                <Button
                  onClick={() => {
                    deleteParticipant(e._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
