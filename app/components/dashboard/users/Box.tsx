import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import EmptyStates from "../EmptyStates";
import { useState } from "react";
import Confirmation from "./Confirmation";

type Box = {
  name: string;
  email: string;
  password: string;
  id: string;
};

interface BoxProps {
  users: Box[];
  isLoading: boolean;
  setUsers: React.Dispatch<React.SetStateAction<Box[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<Box>>;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: string) => void;
}

const Box: React.FC<BoxProps> = ({
  users,
  isLoading,
  setUsers,
  setCurrentUser,
  setEditOpen,
  handleDelete,
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
        users={users}
        setUsers={setUsers}
        handleDelete={handleDelete}
      />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : users[0] ? (
          users.map((list, index) => (
            <li
              key={index}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 dark:bg-secondaryDark"
            >
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate dark:text-darkText">
                      {list.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate dark:text-darkText">
                    {list.email}
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-500">
                  <div className="w-0 flex-1 flex">
                    <button
                      onClick={() => {
                        setCurrentUser(list);
                        setEditOpen(true);
                      }}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 dark:text-darkText"
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
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:text-darkText"
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
          <EmptyStates name="Create a new User" />
        )}
      </ul>
    </div>
  );
};

export default Box;
