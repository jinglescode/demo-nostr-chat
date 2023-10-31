import ChatContainer from "@/components/ChatContainer";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 bg-white dark:bg-gray-900 antialiased">
      <div className="py-8">
        <Link href="/">back</Link>
      </div>
      <h1 className="text-2xl">Article Title</h1>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut accusantium
        ea maxime dolorem? Nobis repellendus quisquam hic voluptatem,
        dignissimos saepe ea? Sunt sapiente quisquam, numquam ipsam eos eveniet
        blanditiis! Quas?
      </div>
      <ChatContainer />
    </div>
  );
}
