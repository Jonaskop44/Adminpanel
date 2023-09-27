"use client";

import { useEffect, useState } from "react";
import Model from "@/app/components/dashboard/Module";
import Box from "@/app/components/dashboard/license/Box";
import axios from "axios";
import Notifications from "@/app/components/dashboard/license/Notifications";
import { GoAlert, GoCheck } from "react-icons/go";

const Server = () => {
  const [open, setOpen] = useState(false);
  const [servers, setServers] = useState<Box[]>([]);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [moduleForm, setModuleForm] = useState<Box>({
    name: "",
    description: "",
    license: true,
    id: 0,
  });
  const initBox: Box = { name: "", description: "", license: true, id: 0 };
  const [currentNotification, setCurrentNotification] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentServer, setCurrentServer] = useState<Box>(initBox);

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

  const handleCreate = async () => {
    if (!moduleForm.name || !moduleForm.description) {
      return setCurrentNotification("invalid-info");
    } else {
      setCurrentNotification("create-success");
    }
    const response = await axios.post("/api/server", {
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
        id: response.data.id,
      },
    ]);
    setModuleForm(initBox);
    setOpen(false);
  };

  const handleEdit = async () => {
    await axios.patch(`/api/server/${currentServer.id}`, currentServer);
    setServers((prev) => {
      const updatedServers = prev.map((item) => {
        if (item.id == currentServer.id) {
          return currentServer;
        }
        return item;
      });
      return updatedServers;
    });
    setCurrentServer(initBox);
    setCurrentNotification("saved-success");
  };

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="m-0 h-full">
      {currentNotification == "invalid-info" && (
        <Notifications
          currentNotification={currentNotification}
          setCurrentNotification={setCurrentNotification}
          title="Invalid Information"
          description="Please fill out all the fields"
          icon={<GoAlert className="h-6 w-6 text-red-400" />}
        />
      )}
      {currentNotification == "create-success" && (
        <Notifications
          currentNotification={currentNotification}
          setCurrentNotification={setCurrentNotification}
          title="Created Successfully"
          description=""
          icon={<GoCheck className="h-6 w-6 text-green-400" />}
        />
      )}
      {currentNotification == "saved-success" && (
        <Notifications
          currentNotification={currentNotification}
          setCurrentNotification={setCurrentNotification}
          title="Saved Successfully"
          description=""
          icon={<GoCheck className="h-6 w-6 text-green-400" />}
        />
      )}
      <div className="flex justify-end items-start">
        <button
          className="bg-blue-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-xl"
          onClick={handleOpen}
        >
          Add Server
        </button>
      </div>
      <div className="flex items-center justify-center h-screen">
        <Box
          servers={servers}
          isLoading={isLoading}
          setServers={setServers}
          setCurrentServer={setCurrentServer}
          setEditOpen={setEditOpen}
        />
      </div>
      <Model
        open={open}
        setOpen={setOpen}
        title="Enter Sever Details"
        description="Fill out the formula"
        updateModuleForm={setModuleForm}
        handleCreate={handleCreate}
        currentData={moduleForm}
        button="Create"
      />
      <Model
        open={editOpen}
        setOpen={setEditOpen}
        title="Edit Server"
        description="Fill out the formula"
        updateModuleForm={setCurrentServer}
        handleCreate={handleEdit}
        currentData={currentServer}
        button="Save"
      />
    </div>
  );
};

export default Server;
