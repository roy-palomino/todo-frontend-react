import { FC } from "react";
import AppBar from "../components/AppBar";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-dvh bg-primary-1">
      <AppBar />
      <div className="container mx-auto flex flex-1 h-max px-5 py-4 max-w-[1200px]">{children}</div>
    </div>
  );
};

export default DefaultLayout;
