import { FC, ReactNode } from "react";
import Sidebar from "./navbar/Sidebar";

interface LayoutPops {
  children: ReactNode;
}

const UserLayout: FC<LayoutPops> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5">{children}</div>
    </div>
  );
};

export default UserLayout;
