import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNDK } from "../ndk-react";
import { NDKEvent } from "@nostr-dev-kit/ndk";

export function useChannelChatPost(id: string | undefined) {
  const queryClient = useQueryClient();

  const { ndk, signPublishEvent } = useNDK();

  return useMutation(
    async (message: string) => {
      if (!ndk) return undefined;

      const event = new NDKEvent();
      event.kind = 42;
      event.content = message;
      event.tags = [["e", id!]];
      console.log(2, event);

      const success = await signPublishEvent(event);
      if (success) return event;
      return undefined;
    },
    {
      onSettled: (event) => {
        if (event) {
          const eTags = event.tags.filter((t) => t[0] === "e");
          if (eTags.length > 0) {
            setTimeout(function () {
              queryClient.invalidateQueries(["room", eTags[0][1], "chat"]);
            }, 2000);
          }
        }
      },
    }
  );
}
