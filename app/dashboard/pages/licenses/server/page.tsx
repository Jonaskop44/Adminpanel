"use client";
import Model from "@/app/components/Modal";

const Server = () => {
  return (
    <div>
      <div className="flex justify-end items-start">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Server
        </button>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="text-4xl font-semibold">
          <h1 className="text-gray-800">Server</h1>
        </div>
      </div>
    </div>
  );
};

export default Server;
