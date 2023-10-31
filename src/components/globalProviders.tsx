import { NDKProvider } from "@/lib/ndk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import { useState, useEffect } from "react";

export default function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <QueryClientProvider client={queryClient}>
          <NDKProvider
            relayUrls={["wss://relay.damus.io", "wss://relay.nostr.band"]}
          >
            {children}
          </NDKProvider>
        </QueryClientProvider>
      )}
    </>
  );
}
