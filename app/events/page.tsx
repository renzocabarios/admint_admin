"use client";
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
      <button
        onClick={() => {
          router.push("events/create");
        }}
      >
        Create
      </button>

      <div className="p-3 flex flex-col gap-2">
        {events.map((e: any) => {
          return (
            <div
              key={e._id}
              className="p-2 bg-purple-500 rounded-md"
              onClick={() => {
                router.push(`/events/${e._id}`);
              }}
            >
              <p>{e._id}</p>
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
