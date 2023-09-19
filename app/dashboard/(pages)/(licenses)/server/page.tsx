"use client";

import { useEffect, useState } from "react";
import Model from "@/app/components/dashboard/Module";
import Box from "@/app/components/dashboard/license/Box";
import axios from "axios";

const Server = () => {
  const [open, setOpen] = useState(false);
  const [servers, setServers] = useState<Box[]>([]);
  const [moduleForm, setModuleForm] = useState<Box>({
    name: "",
    description: "",
    license: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getServers = async () => {
      const servers = await axios.get("/api/server");
      setServers(servers.data);
      setIsLoading(false);
    };
    getServers();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCreate = () => {
    axios.post("/api/server", {
      name: moduleForm.name,
      description: moduleForm.description,
      license: moduleForm.license,
    });
    setServers((prev) => [
      ...prev,
      {
        name: moduleForm.name,
        description: moduleForm.description,
        license: moduleForm.license,
      },
    ]);
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
        <Box servers={servers} isLoading={isLoading} />
      </div>
      <Model
        open={open}
        setOpen={setOpen}
        title="Enter Sever Details"
        description="Fill out the formula"
        updateModuleForm={setModuleForm}
        handleCreate={handleCreate}
      />
    </div>
  );
};

export default Server;
