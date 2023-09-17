"use client";

import { useEffect, useState } from "react";
import Model from "@/app/components/dashboard/Module";

const Server = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCreate = () => {
    setOpen(false);
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
          className="bg-blue-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-xl"
          onClick={handleOpen}
        >
          Add Server
        </button>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-semibold">
          <h1 className="text-gray-800">Server</h1>
        </div>
        {Boolean(name) && (
          <div>
            <h1>Name: {name}</h1>
          </div>
        )}
        {Boolean(description) && (
          <div>
            <h1>Description: {description}</h1>
          </div>
        )}
      </div>
      <Model
        open={open}
        setOpen={setOpen}
        title="Enter Sever Details"
        description="Fill out the formula"
        updateName={setName}
        updateDescription={setDescription}
        handleCreate={handleCreate}
      />
    </div>
  );
};

export default Server;
