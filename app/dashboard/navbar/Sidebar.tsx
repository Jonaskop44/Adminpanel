"use client";

import { Disclosure } from "@headlessui/react";
import * as IconAi from "react-icons/ai";
import * as IconTb from "react-icons/tb";
import * as IconVsc from "react-icons/vsc";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

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
      { name: "Server", href: "/dashboard/pages/licenses/server" },
      { name: "Plugins", href: "/dashboard/pages/licenses/plugins" },
    ],
  },
  {
    name: "Discord-Bots",
    icon: IconTb.TbRobot,
    current: false,
    children: [{ name: "WFYO", href: "/dashboard/pages/discord/wfyo" }],
  },
];

const secondaryNavigation = [
  {
    name: "Users",
    icon: IconAi.AiOutlineUser,
    current: false,
    href: "/dashboard/pages/users",
  },
];

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Sidebar = () => {
  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto h-screen">
      <div className="flex items-center flex-shrink-0 px-4">
        <Image
          src="/images/logo.png"
          alt=""
          width="40"
          height="40"
          className="mr-4"
        />
        <h1 className="text-2xl font-semibold text-gray-600">Dashboard</h1>
      </div>
      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
          {navigation.map((item) =>
            !item.children ? (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500",
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
                          ? "bg-gray-100 text-gray-900"
                          : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      )}
                    >
                      <item.icon
                        className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="flex-1">{item.name}</span>
                      <svg
                        className={classNames(
                          open ? "text-gray-400 rotate-90" : "text-gray-300",
                          "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                        )}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="space-y-1">
                      {item.children.map((subItem) => (
                        <Disclosure.Button
                          key={subItem.name}
                          as="a"
                          href={subItem.href}
                          className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
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
          <nav className="pt-4 border-t border-gray-200">
            {secondaryNavigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500",
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
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <button
          className={classNames(
            false
              ? "bg-gray-100 text-gray-900"
              : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md"
          )}
          onClick={() => signOut()}
        >
          <IconVsc.VscSignOut
            className={classNames(
              false
                ? "text-gray-500"
                : "text-gray-400 group-hover:text-gray-500",
              "mr-3 flex-shrink-0 h-6 w-6"
            )}
            aria-hidden="true"
          />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
