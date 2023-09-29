import { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";
import { set } from "react-hook-form";

interface NotificationsProps {
  setCurrentNotification: React.Dispatch<React.SetStateAction<string>>;
  currentNotification: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Notifications: React.FC<NotificationsProps> = ({
  setCurrentNotification,
  currentNotification,
  title,
  description,
  icon,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setCurrentNotification("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [setCurrentNotification]);

  return (
    <>
      {}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white dark:bg-secondaryDark shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{icon}</div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-darkText">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      {description}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:text-darkText dark:hover:text-gray-400 dark:bg-secondaryDark"
                      onClick={() => {
                        setCurrentNotification("");
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <HiOutlineX className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default Notifications;
