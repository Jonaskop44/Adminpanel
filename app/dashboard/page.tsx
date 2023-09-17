"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const App = () => {
  const session = useSession();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold text-gray-800">
        Login as {session.data?.user?.name}
      </h1>
      <button onClick={() => signOut()}>Sign</button>
      <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
        @CodeFlexx
      </div>
    </div>
  );
};

export default App;
