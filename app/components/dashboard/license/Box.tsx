import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import EmptyStates from "./EmptyStates";
import { useState } from "react";
import Confirmation from "./Confirmation";

type Box = {
  name: string;
  description: string;
  license: boolean;
  id: number;
};

interface BoxProps {
  servers: Box[];
  isLoading: boolean;
  setServers: React.Dispatch<React.SetStateAction<Box[]>>;
  setCurrentServer: React.Dispatch<React.SetStateAction<Box>>;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Box: React.FC<BoxProps> = ({
  servers,
  isLoading,
  setServers,
  setCurrentServer,
  setEditOpen,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Confirmation
        open={open}
        setOpen={setOpen}
        servers={servers}
        setServers={setServers}
      />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : servers[0] ? (
          servers.map((list, index) => (
            <li
              key={index}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      {list.name}
                    </h3>
                    {list.license ? (
                      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        Licensed
                      </span>
                    ) : (
                      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full">
                        Unlicensed
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {list.description}
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <button
                      onClick={() => {
                        setCurrentServer(list);
                        setEditOpen(true);
                      }}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <HiOutlinePencil
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Edit
                    </button>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <button
                      onClick={handleOpen}
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <RiDeleteBin6Line
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <EmptyStates name="Create a new Server" />
        )}
      </ul>
    </div>
  );
};

export default Box;
