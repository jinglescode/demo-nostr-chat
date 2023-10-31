import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { generatePrivateKey, getPublicKey } from "nostr-tools";
import { nip19 } from "nostr-tools";

interface State {
  hasAccount: () => boolean;
  nsec: string;
  npub: string;
  createAccount: () => string;
}

export const useNostrStore = create<State>()(
  persist(
    (set, get) => ({
      nsec: "",
      npub: "",
      hasAccount: () => {
        return get().nsec !== "";
      },
      createAccount: () => {
        let sk = generatePrivateKey();
        let nsec = nip19.nsecEncode(sk);
        let pk = getPublicKey(sk);
        let npub = nip19.npubEncode(pk);
        set({ nsec: nsec, npub: npub });
        return nsec;
      },
    }),
    {
      name: "demo-nostr",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
