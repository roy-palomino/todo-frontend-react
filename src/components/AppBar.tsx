import { FC, useEffect, useState } from "react";

import { useLocation } from "wouter";

import { Link } from "wouter";
import { UserCircleIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import useAuth from "../stores/useAuth";

const menuItems = [
  {
    url: "/",
    name: "Home",
  },
  {
    url: "/logout",
    name: "Logout",
  },
];

const AppBar: FC = () => {
  const user = useAuth((store) => store.user);
  const getSelfData = useAuth((store) => store.getSelfData);
  const [location, navigate] = useLocation();
  const [currentView, setCurrentView] = useState("");

  useEffect(() => {
    const locationChunks = location.split("/").filter((e) => e !== "");
    if (locationChunks.length !== 0) {
      setCurrentView(locationChunks[0]);
    }
  }, [location]);

  useEffect(() => {
    getSelfData();
  }, []);

  return (
    <div className="flex flex-row py-4 px-5 md:px-9 w-full justify-between items-center bg-primary-1 max-w-[1200px] mx-auto">
      {currentView && (
        <div className="flex flex-row items-center">
          <button>
            <ChevronLeftIcon
              onClick={() => navigate("/")}
              className="w-6 text-white"
            />
          </button>
        </div>
      )}
      <div className="flex flex-row items-center justify-end w-full">
        <span className="text-sm font-semibold text-white mr-1">
          {user?.username}
        </span>

        <Menu>
          <MenuButton>
            <UserCircleIcon className="size-10 text-white" />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-left rounded-xl border border-black/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-blue-500 data-[closed]:scale-95 shadow-lg data-[closed]:opacity-0"
          >
            {menuItems.map((item) => (
              <MenuItem key={item.url}>
                <Link
                  href={item.url}
                  className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:!bg-black z-10"
                >
                  {item.name}
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default AppBar;
