import { useNostrStore } from "@/stores/nostrStores";
import { useState } from "react";
import { NDKEvent } from "@nostr-dev-kit/ndk";
import { useNDK } from "@/lib/ndk-react";

export default function ChatSettings({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Function;
}) {
  const { createAccount, nsec } = useNostrStore();
  const { signPublishEvent } = useNDK();

  const [updating, setUpdating] = useState<boolean>(false);
  const [name, setname] = useState<string>("");

  async function updateName() {
    setUpdating(true);
    const note = new NDKEvent();
    note.kind = 0;
    note.content = `{"display_name":"${name}"}`;
    await signPublishEvent(note);
    setUpdating(false);
    setname("");
  }

  return (
    <div className="bg-white">
      <div
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full ${
          !show && "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Account
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShow(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form action="#">
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your display name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => updateName()}
                disabled={updating}
              >
                Update name
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
