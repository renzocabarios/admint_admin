import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function get(url: string) {
  return (await api.get(url)).data;
}

export async function post<T>(url: string, body: T) {
  return (await api.post(url, body)).data;
}

export async function patch<T>(url: string, body: T) {
  return (await api.patch(url, body)).data;
}

export async function remove(url: string) {
  return (await api.delete(url)).data;
}
