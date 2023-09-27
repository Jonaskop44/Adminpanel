"use client";

import { useEffect, useState } from "react";
import Model from "@/app/components/dashboard/Module";
import Box from "@/app/components/dashboard/license/Box";
import axios from "axios";
import Notifications from "@/app/components/dashboard/license/Notifications";
import { GoAlert, GoCheck } from "react-icons/go";

const Plugins = () => {
  const [open, setOpen] = useState(false);
  const [plugins, setPlugins] = useState<Box[]>([]);
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
  const [currentPlugin, setCurrentPlugin] = useState<Box>(initBox);

  useEffect(() => {
    const getPlugins = async () => {
      const plugins = await axios.get("/api/plugin");
      setPlugins(plugins.data);
      setIsLoading(false);
    };
    getPlugins();
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
    const response = await axios.post("/api/plugin", {
      name: moduleForm.name,
      description: moduleForm.description,
      license: moduleForm.license,
    });
    setPlugins((prev) => [
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

  const handleDelete = (id: number) => {
    axios
      .delete("/api/plugin/" + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = async () => {
    await axios.patch(`/api/plugin/${currentPlugin.id}`, currentPlugin);
    setPlugins((prev) => {
      const updatedPlugins = prev.map((item) => {
        if (item.id === currentPlugin.id) {
          return currentPlugin;
        } else {
          return item;
        }
      });
      return updatedPlugins;
    });

    setCurrentPlugin(initBox);
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
          servers={plugins}
          isLoading={isLoading}
          setServers={setPlugins}
          setCurrentServer={setCurrentPlugin}
          setEditOpen={setEditOpen}
          handleDelete={handleDelete}
        />
      </div>
      <Model
        open={open}
        setOpen={setOpen}
        title="Enter Plugin Details"
        description="Fill out the formula"
        updateModuleForm={setModuleForm}
        handleCreate={handleCreate}
        currentData={moduleForm}
        button="Create"
      />
      <Model
        open={editOpen}
        setOpen={setEditOpen}
        title="Edit Plugin"
        description="Fill out the formula"
        updateModuleForm={setCurrentPlugin}
        handleCreate={handleEdit}
        currentData={currentPlugin}
        button="Save"
      />
    </div>
  );
};

export default Plugins;
