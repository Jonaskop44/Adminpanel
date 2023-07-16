"use client";

import { useSession } from "next-auth/react";

const App = () => {
  const session = useSession();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-4xl font-semibold">
        <h1 className="text-gray-800">Login as {session.data?.user?.name}</h1>
      </div>
    </div>
  );
};

export default App;
