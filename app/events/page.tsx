"use client";
import { Button, FormInput } from "@/components";
import { get } from "@/config";
import { useEventStore } from "@/states";
import { parseDate } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { events, fetchEvents } = useEventStore() as any;
  const [search, setsearch] = useState("");

  const filtered = useMemo(() => {
    if (search != "") return events.filter((e: any) => e.name.includes(search));
    return events;
  }, [events, search]);

  useEffect(() => {
    const start = async () => {
      const temp = await get("events");
      if (temp.status == "success") fetchEvents(temp.data);
    };
    start();
  }, [events, search, fetchEvents]);

  const handleChange = (e: any) => {
    setsearch(e.target.value);
  };

  return (
    <main>
      <div className="py-2 flex justify-between items-center w-full">
        <FormInput title="Search event" onChange={handleChange}></FormInput>
        <Button
          onClick={() => {
            router.push("events/create");
          }}
        >
          Create Event
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((e: any) => {
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
