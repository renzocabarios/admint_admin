import { create } from "zustand";

export const useParticipantStore = create((set) => ({
  participants: [],
  fetchParticipants: (entries: any[]) => set(() => ({ participants: entries })),
  sendNft: (participantId: any) => {
    return set((state: any) => ({
      participants: state.participants.map((e: any) => {
        if (e._id == participantId) e.recevied = true;
        return e;
      }),
    }));
  },
}));
