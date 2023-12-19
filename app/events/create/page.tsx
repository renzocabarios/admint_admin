"use client";
import { FormInput } from "@/components";
import { post } from "@/config";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [formData, setformData] = useState({
    name: "",
    start: "",
    end: "",
    candyMachine: "",
  });

  const sendForm = async () => {
    const temp = await post("events", formData);
    if (temp.status == "success") router.push("/events");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setformData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <main>
      <FormInput name="name" title="Name" onChange={handleChange} />
      <FormInput
        name="candyMachine"
        title="CandyMachine"
        onChange={handleChange}
      />
      <FormInput
        name="start"
        title="Start"
        type="date"
        onChange={handleChange}
      />
      <FormInput name="end" title="End" type="date" onChange={handleChange} />
      <button onClick={sendForm}>Click Me</button>
    </main>
  );
}
