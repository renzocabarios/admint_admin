"use client";
import { Button } from "@/components";
import { get } from "@/config";
import { parseDate } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [events, setevents] = useState([]);

  useEffect(() => {
    const start = async () => {
      const temp = await get("events");
      if (temp.status == "success") setevents(temp.data);
    };
    start();
  }, []);

  return (
    <main>
      <Button
        onClick={() => {
          router.push("events/create");
        }}
      >
        Create
      </Button>

      <div className="p-3 flex flex-col gap-2">
        {events.map((e: any) => {
          return (
            <div
              key={e._id}
              className="p-4 bg-slate-500 text-white rounded-md"
              onClick={() => {
                router.push(`/events/${e._id}`);
              }}
            >
              <p>{e.name}</p>
              <p>{`${parseDate(e.start)}`}</p>
              <p>{`${parseDate(e.end)}`}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
