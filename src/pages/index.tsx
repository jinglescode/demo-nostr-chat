// import { useEffect, useState } from "react";
// import { useNostrStore } from "@/stores/nostrStores";
// import { useNDK } from "@/lib/ndk-react";
// import { NDKEvent } from "@nostr-dev-kit/ndk";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-96 flex flex-col gap-4 bg-white dark:bg-gray-900 antialiased">
      <h1 className="text-3xl my-8">Chat Demo</h1>
      <Link className="w-full border p-4" href={`page/test1`}>
        Article One
      </Link>
      <Link className="w-full border p-4" href={`page/test2`}>
        Article Two
      </Link>
    </div>
  );
}

// function UserAccountCreate() {
//   const { hasAccount, nsec, npub, createAccount } = useNostrStore();
//   const [tmpShowNsecNewUser, setTmpShowNsecNewUser] = useState<
//     string | undefined
//   >(undefined);
//   const { loginWithSecret } = useNDK();

//   async function createNostrAccount() {
//     const nsec = createAccount();
//     const user = await loginWithSecret(nsec);
//     console.log("user created", user);
//     setTmpShowNsecNewUser(nsec);
//   }

//   useEffect(() => {
//     async function load() {
//       const user = await loginWithSecret(nsec);
//       console.log("connected user", user);
//     }
//     if (hasAccount()) {
//       load();
//     }
//   }, [hasAccount]);

//   return (
//     <div>
//       {hasAccount() == false && (
//         <div>
//           <p>You dont have a NOSTR account</p>
//           <button onClick={() => createNostrAccount()}>create one</button>
//         </div>
//       )}
//       {tmpShowNsecNewUser && (
//         <div>
//           You have successfully created a NOSTR account, please save your nsec:
//           <p>{tmpShowNsecNewUser}</p>
//           <button onClick={() => setTmpShowNsecNewUser(undefined)}>
//             i have saved it
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// function ProfileArea() {
//   const { hasAccount, nsec, npub } = useNostrStore();
//   const [name, setname] = useState<string>("");
//   const { ndk, signPublishEvent, signer } = useNDK();
//   const { getProfile } = useNDK();

//   async function updateName() {
//     const note = new NDKEvent();
//     note.kind = 0;
//     note.content = `{\"display_name\":\"${name}\"}`;
//     const event = await signPublishEvent(note);
//   }

//   return (
//     <div>
//       {hasAccount() == true && (
//         <div>
//           <p>Your display name: {getProfile(npub).displayName}</p>
//           <p>Your npub: {npub}</p>
//           <p>update your name</p>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setname(e.target.value)}
//           />
//           <button onClick={() => updateName()}>update profile</button>
//         </div>
//       )}
//     </div>
//   );
// }
