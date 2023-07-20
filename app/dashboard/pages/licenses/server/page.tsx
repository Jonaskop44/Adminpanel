"use client";

import { useEffect, useState } from "react";
import Model from "@/app/components/Modal";

const Server = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="m-0 h-full">
      <div className="flex justify-end items-start">
        <button
          className="mt-4 mr-4 bg-blue-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-xl"
          onClick={handleOpen}
        >
          Add Server
        </button>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-semibold">
          <h1 className="text-gray-800">Server</h1>
        </div>
      </div>
      <Model
        open={open}
        setOpen={setOpen}
        title="Enter Sever Details"
        description="Fill out the formula"
      />
    </div>
  );
};

export default Server;
