"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";

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
      <div className="absolute top-12 right-[250px]">
        <ThemeSwitcher />
      </div>
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-darkText">
        Login as {session.data?.user?.name}
      </h1>
      <button onClick={() => signOut()}>Sign</button>
      <div className="absolute bottom-2 right-2 text-gray-500 text-sm dark:text-gray-400">
        @CodeFlexx
      </div>
    </div>
  );
};

export default App;
