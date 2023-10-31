import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNDK } from "../ndk-react";
import { NDKFilter } from "@nostr-dev-kit/ndk";

export function useChannelRoom(id: string | undefined) {
  const queryClient = useQueryClient();
  const { ndk, fetchEvents } = useNDK();
  const { status, data, error, isFetching } = useQuery(
    ["room", id],
    async () => {
      const filter: NDKFilter = {
        kinds: [40],
        "#d": [id!],
      };
      const events = await fetchEvents(filter);
      console.log(9999, "useChannelRoom", events.length);

      if (events.length === 0) return null;

      const rooms = events.map((e) => {
        let room = JSON.parse(e.content);
        room.id = e.id;
        return room;
      });

      return rooms[0];
    },
    {
      enabled: !!id && !!ndk,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24 * 7,
    }
  );

  return { status, data, error, isFetching };
}
