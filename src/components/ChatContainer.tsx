import ChatMessage from "./ChatMessage";
import { useNDK } from "@/lib/ndk-react";
import { useChannelRoom } from "@/lib/nostr/useChannelRoom";
import { useNostrStore } from "@/stores/nostrStores";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useChannelChat } from "@/lib/nostr/useChannelChat";
import { useChannelChatPost } from "@/lib/nostr/useChannelChatPost";
import { useQueryClient } from "@tanstack/react-query";
import ChatSettings from "./ChatSettings";

export default function ChatContainer() {
  const router = useRouter();
  const { data: roomData, status } = useChannelRoom(router.query.id as string);
  const { hasAccount, nsec, createAccount } = useNostrStore();
  const [chatMessageInput, setChatMessageInput] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { signPublishEvent, signer, loginWithSecret, getProfile } = useNDK();

  const { data: chatsData } = useChannelChat(
    roomData ? roomData.id : undefined
  );

  const { mutate, isSuccess, isError } = useChannelChatPost(
    roomData ? roomData.id : undefined
  );
  const queryClient = useQueryClient();

  async function sendMessage() {
    setLoading(true);
    mutate(chatMessageInput);
  }

  async function createRoom() {
    setLoading(true);

    const meta = {
      name: `Demo Chat Room ${router.query.id}`,
      about: "This is a test room",
    };

    const event = new NDKEvent();
    event.kind = 40;
    event.content = JSON.stringify(meta);
    event.tags = [["d", router.query.id as string]];

    await signPublishEvent(event);

    queryClient.invalidateQueries({
      queryKey: ["room", router.query.id],
      exact: true,
    });

    setLoading(false);
  }

  useEffect(() => {
    async function load() {
      console.log(333, "nsec", nsec);
      const user = await loginWithSecret(nsec);
      console.log("connected user", user);
    }
    if (hasAccount() && nsec) {
      load();
    } else {
      createAccount();
      console.log(111);
    }
  }, [hasAccount]);

  useEffect(() => {
    if (isSuccess || isError) {
      queryClient.invalidateQueries({
        queryKey: ["room", router.query.id],
        exact: true,
      });
      setLoading(false);
    }
    if (isSuccess) {
      setChatMessageInput("");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <ChatSettings show={showSettings} setShow={setShowSettings} />
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Chat
            </h2>
            <div>
              <button onClick={() => setShowSettings(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {status == "loading" && <p>loading</p>}

          {status == "success" && roomData == null && (
            <>
              <button
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                onClick={() => createRoom()}
                disabled={loading}
              >
                Initialize Chat Room
              </button>
            </>
          )}

          {roomData && (
            <>
              {hasAccount() && (
                <div className="mb-6">
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label className="sr-only">Send</label>
                    <textarea
                      rows={2}
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write a message..."
                      value={chatMessageInput}
                      onChange={(e) => setChatMessageInput(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    onClick={() => sendMessage()}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    disabled={loading}
                  >
                    Send
                  </button>
                </div>
              )}

              <div className="h-96 overflow-y-auto">
                {chatsData?.map((chat) => {
                  return <ChatMessage key={chat.id} chat={chat} />;
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
