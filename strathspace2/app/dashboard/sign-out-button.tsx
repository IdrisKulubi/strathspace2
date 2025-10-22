"use client";

import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
    >
      Sign Out
    </button>
  );
}
