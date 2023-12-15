import { create } from "zustand";

export const useParticipantStore = create((set) => ({
  participants: [],
  fetchParticipants: (entries: any[]) => set(() => ({ participants: entries })),
  removeParticipantById: (_id: string) =>
    set((state: any) => ({
      participants: state.filter((e: any) => e.participants._id != _id),
    })),
  sendNft: (participantId: any) => {
    return set((state: any) => ({
      participants: state.participants.map((e: any) => {
        if (e._id == participantId) e.recevied = true;
        return e;
      }),
    }));
  },
}));

export const useEventStore = create((set) => ({
  events: [],
  fetchEvents: (entries: any[]) => set(() => ({ events: entries })),
  sendNft: (participantId: any) => {
    return set((state: any) => ({
      participants: state.participants.map((e: any) => {
        if (e._id == participantId) e.recevied = true;
        return e;
      }),
    }));
  },
}));

export const useModalStore = create((set) => ({
  isOpen: false,
  toggleOpen: () => set((prev: any) => ({ isOpen: !prev.isOpen })),
}));
