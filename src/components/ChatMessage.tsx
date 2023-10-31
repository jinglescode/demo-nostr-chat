import { useNDK } from "@/lib/ndk-react";

export default function ChatMessage({ chat }: { chat: any }) {
  const { getProfile } = useNDK();

  function formatDate(dateString: number) {
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    var dt = new Date(dateString * 1000);
    return `${dt.getDate()} ${
      months[dt.getMonth()]
    } ${dt.getFullYear()} at ${dt.getHours()}:${dt.getMinutes()}`;
  }

  return (
    <article className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            {getProfile(chat.author).displayName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time>{formatDate(chat.created_at)}</time>
          </p>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{chat.content}</p>
    </article>
  );
}
