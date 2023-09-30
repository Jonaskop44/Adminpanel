"use client";
import { Fragment, useState, ReactNode, FC } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import * as IconAi from "react-icons/ai";
import * as IconTb from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";

const navigation = [
  {
    name: "Home",
    icon: IconAi.AiOutlineHome,
    current: false,
    href: "/dashboard",
  },
  {
    name: "Lizenzen",
    icon: IconTb.TbLicense,
    current: false,
    children: [
      { name: "Server", href: "/dashboard/server" },
      { name: "Plugins", href: "/dashboard/plugins" },
    ],
  },
  {
    name: "Discord-Bots",
    icon: IconTb.TbRobot,
    current: false,
    children: [{ name: "WFYO", href: "/dashboard/discord/wfyo" }],
  },
];

const secondaryNavigation = [
  {
    name: "Users",
    icon: IconAi.AiOutlineUser,
    current: false,
    href: "/dashboard/users",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface LayoutProps {
  children: ReactNode;
}

const UserLayout: FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = useSession();

  return (
    <>
      {}
      <div className="dark:bg-dark">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-dark">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <IconAi.AiOutlineClose
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <Image
                      src="/images/logo.png"
                      alt=""
                      width="40"
                      height="40"
                      className="mr-4"
                    />
                    <h1 className="text-2xl font-semibold text-gray-600 dark:text-darkText">
                      Dashboard
                    </h1>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) =>
                      !item.children ? (
                        <div key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900 dark:bg-dark dark:text-darkText"
                                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:bg-dark dark:text-darkText dark:hover:bg-secondaryDark",
                              "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500 dark:text-darkText"
                                  : "text-gray-400 group-hover:text-gray-500 dark:text-darkText dark:group-hover:text-darkText",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        </div>
                      ) : (
                        <Disclosure
                          as="div"
                          key={item.name}
                          className="space-y-1"
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  item.current
                                    ? "bg-gray-100 text-gray-900 dark:bg-dark dark:text-darkText"
                                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:bg-dark dark:text-darkText dark:hover:bg-secondaryDark",
                                  "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
                                )}
                              >
                                <item.icon
                                  className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:text-darkText dark:group-hover:text-darkText"
                                  aria-hidden="true"
                                />
                                <span className="flex-1">{item.name}</span>
                                <svg
                                  className={classNames(
                                    open
                                      ? "text-gray-400 rotate-90 dark:text-darkText"
                                      : "text-gray-300 dark:text-darkText",
                                    "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150 dark:group-hover:text-darkText"
                                  )}
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M6 6L14 10L6 14V6Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Disclosure.Button>
                              <Disclosure.Panel className="space-y-1">
                                {item.children.map((subItem) => (
                                  <Disclosure.Button
                                    key={subItem.name}
                                    as="a"
                                    href={subItem.href}
                                    className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:text-darkText dark:hover:text-darkText dark:hover:bg-secondaryDark"
                                  >
                                    {subItem.name}
                                  </Disclosure.Button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )
                    )}
                    <nav className="pt-4 border-t border-gray-200 dark:border-gray-500">
                      {secondaryNavigation.map((item) => (
                        <div key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900 dark:bg-dark dark:hover:text-darkText"
                                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:bg-dark dark:text-darkText dark:hover:bg-secondaryDark dark:hover:text-darkText",
                              "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500 dark:text-darkText"
                                  : "text-gray-400 group-hover:text-gray-500 dark:text-darkText dark:group-hover:text-darkText",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </nav>
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-500 p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <Image
                          src="/images/profile.png"
                          alt="Profile"
                          height="40"
                          width="40"
                          className="inline-block rounded-full"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900 dark:text-darkText dark:group-hover:text-darkText">
                          <SessionProvider>
                            {session.data?.user?.name}
                          </SessionProvider>
                        </p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 dark:text-darkText dark:group-hover:text-darkText dark:hover:underline">
                          <Link href={"/dashboard/settings"}>Settings</Link>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-500 bg-white dark:bg-dark">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width="40"
                  height="40"
                  className="mr-4"
                />
                <h1 className="text-2xl font-semibold text-gray-600 dark:text-darkText">
                  Dashboard
                </h1>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1 dark:bg-dark">
                {navigation.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900 dark:bg-dark dark:text-darkText"
                            : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:bg-dark dark:text-darkText dark:hover:bg-secondaryDark",
                          "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500 dark:text-darkText"
                              : "text-gray-400 group-hover:text-gray-500 dark:text-darkText dark:group-hover:text-darkText",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900 dark:bg-dark dark:text-darkText"
                                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:bg-dark dark:text-darkText dark:hover:bg-secondaryDark",
                              "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-sky-600"
                            )}
                          >
                            <item.icon
                              className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 dark:text-darkText dark:group-hover:text-darkText"
                              aria-hidden="true"
                            />
                            <span className="flex-1">{item.name}</span>
                            <svg
                              className={classNames(
                                open
                                  ? "text-gray-400 rotate-90 dark:text-darkText"
                                  : "text-gray-300 dark:text-darkText",
                                "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150 dark:group-hover:text-darkText"
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 6L14 10L6 14V6Z"
                                fill="currentColor"
                              />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                              <Disclosure.Button
                                key={subItem.name}
                                as="a"
                                href={subItem.href}
                                className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:text-darkText dark:hover:text-darkText dark:hover:bg-secondaryDark"
                              >
                                {subItem.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
                <nav className="pt-4 border-t border-gray-200 dark:border-gray-500">
                  {secondaryNavigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-gray-900 dark:bg-dark dark:hover:text-darkText"
                            : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:bg-dark dark:text-darkText dark:hover:bg-secondaryDark dark:hover:text-darkText",
                          "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500 dark:text-darkText"
                              : "text-gray-400 group-hover:text-gray-500 dark:text-darkText dark:group-hover:text-darkText",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </nav>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-500 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <Image
                      src="/images/profile.png"
                      alt="Profile"
                      height="36"
                      width="36"
                      className="inline-block rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 dark:text-darkText dark:group-hover:text-darkText">
                      {session.data?.user?.name}
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 dark:text-darkText dark:group-hover:text-darkText dark:hover:underline">
                      <Link href={"/dashboard/settings"}>Settings</Link>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100 dark:bg-secondaryDark">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-darkText dark:hover:text-darkText"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <IconAi.AiOutlineClose className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 dark:bg-dark">
                {/* Replace with your content */}
                {children}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
