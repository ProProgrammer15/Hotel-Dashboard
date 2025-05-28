import type { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
