"use client";

import Notifications from "@/app/components/dashboard/Notifications";
import Box from "@/app/components/dashboard/users/Box";
import Model from "@/app/components/dashboard/users/Module";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoAlert, GoCheck } from "react-icons/go";
const initBox: Box = {
  name: "",
  email: "",
  password: "",
  id: "",
};
const Users = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<Box[]>([]);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [moduleForm, setModuleForm] = useState<Box>(initBox);

  const [currentNotification, setCurrentNotification] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<Box>(initBox);

  useEffect(() => {
    const getUsers = async () => {
      const users = await axios.get("/api/users");
      setUsers(users.data);
      setIsLoading(false);
    };
    getUsers();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCreate = async () => {
    if (!moduleForm.name || !moduleForm.email || !moduleForm.password) {
      return setCurrentNotification("invalid-info");
    } else {
      setCurrentNotification("create-success");
    }
    const response = await axios.post("/api/users/", {
      name: moduleForm.name,
      email: moduleForm.email,
      password: moduleForm.password,
    });
    setUsers((prev) => [
      ...prev,
      {
        name: moduleForm.name,
        email: moduleForm.email,
        password: moduleForm.password,
        id: response.data.id,
      },
    ]);
    setModuleForm(initBox);
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    axios
      .delete("/api/users/" + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = async () => {
    await axios.patch(`/api/users/${currentUser.id}`, currentUser);
    setUsers((prev) => {
      const updatedUsers = prev.map((item) => {
        if (item.id == currentUser.id) {
          return currentUser;
        }
        return item;
      });
      return updatedUsers;
    });
    setCurrentUser(initBox);
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
          users={users}
          isLoading={isLoading}
          setUsers={setUsers}
          setCurrentUser={setCurrentUser}
          setEditOpen={setEditOpen}
          handleDelete={handleDelete}
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
        updateModuleForm={setCurrentUser}
        handleCreate={handleEdit}
        currentData={currentUser}
        button="Save"
      />
    </div>
  );
};

export default Users;
