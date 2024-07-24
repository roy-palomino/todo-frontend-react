import { FC } from "react";
import AppBar from "../components/AppBar";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-dvh">
      <AppBar />
      <div className="container mx-auto flex flex-1 h-max">{children}</div>
    </div>
  );
};

export default DefaultLayout;
