import { NDKFilter } from "@nostr-dev-kit/ndk";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNDK } from "../ndk-react";

export function useChannelChat(id: string | undefined) {
  const queryClient = useQueryClient();
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["room", id, "chat"],
    async () => {
      console.log("useChannelChat", id);

      const filter: NDKFilter = {
        kinds: [42],
        "#e": [id!],
      };
      const events = await fetchEvents(filter);
      console.log(9999, "useChannelChat", events.length);
      const messages = events.map((e) => {
        return {
          id: e.id,
          content: e.content,
          author: e.pubkey,
          created_at: e.created_at,
        };
      });
      return messages;
    },
    {
      enabled: !!id,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // staleTime: 1000 * 60 * 60 * 24 * 7,
      cacheTime: 1000 * 60 * 60 * 24 * 7,
    }
  );

  return { status, data, error, isFetching };
}
