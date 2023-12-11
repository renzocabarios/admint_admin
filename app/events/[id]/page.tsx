"use client";
import { get } from "@/config";
import { parseDate } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const params = useParams();
  const [events, setevents] = useState([]);

  useEffect(() => {
    const start = async () => {
      const temp = await get(`participants?find={"event":"${params.id}"}`);
      if (temp.status == "success") setevents(temp.data);
    };
    start();
  }, []);

  return (
    <main>
      <div className="p-3 flex flex-col gap-2">
        {events.map((e: any) => {
          return (
            <div key={e._id} className="p-2 bg-purple-500 rounded-md">
              <p>{e.name}</p>
              <p>{e.email}</p>
              <p>{e.walletId}</p>
              <p>Joined: {`${parseDate(e.createdAt)}`}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
