import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as IconFa from "react-icons/fa";
import Input from "@/app/components/dashboard/Input";
import Button from "@/app/components/dashboard/Button";
import Box from "@/app/components/dashboard/users/Box";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  updateModuleForm: React.Dispatch<React.SetStateAction<Box>>;
  handleCreate: () => void;
  currentData: Box;
  button: string;
}

const Model: React.FC<ModalProps> = ({
  open,
  setOpen,
  title,
  description,
  updateModuleForm,
  handleCreate,
  currentData,
  button,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white dark:bg-dark rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-secondaryDark">
                  <IconFa.FaServer
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-darkText"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-darkText">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="justify-center mt-10">
                  <Input
                    id="name"
                    label="Name"
                    required
                    value={currentData.name}
                    onChange={(e) => {
                      const { value, id } = e.target;
                      updateModuleForm((prev) => ({ ...prev, [id]: value }));
                    }}
                  />
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    required
                    value={currentData.email}
                    onChange={(e) => {
                      const { value, id } = e.target;
                      updateModuleForm((prev) => ({ ...prev, [id]: value }));
                    }}
                  />
                  <Input
                    id="password"
                    label="Password"
                    required
                    type="password"
                    value={currentData.password}
                    onChange={(e) => {
                      const { value, id } = e.target;
                      updateModuleForm((prev) => ({ ...prev, [id]: value }));
                    }}
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <Button
                  onClick={() => {
                    handleCreate();
                    setOpen(false);
                  }}
                  style="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-500 text-base font-medium text-white hover:bg-sky-600 focus:outline-none sm:col-start-2 sm:text-sm"
                >
                  {button}
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  style="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-secondaryDark text-base font-medium text-gray-700 dark:text-darkText hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Model;
