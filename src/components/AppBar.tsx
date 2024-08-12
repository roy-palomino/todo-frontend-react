import { FC, useEffect } from "react";
import Navigation from "./Navigation";

import { Link } from "wouter";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import useAuth from "../stores/useAuth";

import { navItems } from "../router";

const AppBar: FC = () => {
  const user = useAuth((store) => store.user);
  const getSelfData = useAuth((store) => store.getSelfData);

  useEffect(() => {
    getSelfData();
  }, []);

  return (
    <div className="flex flex-row py-4 px-5 justify-between items-center bg-primary-1">
      <Menu>
        <MenuButton>
          <Bars3Icon className="size-8 text-white" />
        </MenuButton>
        <MenuItems
          anchor="bottom start"
          className="w-52 origin-top-left rounded-xl border border-black/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-blue-500 data-[closed]:scale-95 shadow-lg data-[closed]:opacity-0"
        >
          {navItems.map((item) => (
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
      <div className="hidden md:block">
        <Navigation />
      </div>
      <div className="flex flex-row items-center">
        <span className="text-sm font-semibold text-white mr-1">{user?.username}</span>
        <UserCircleIcon className="size-10 text-white" />
      </div>
    </div>
  );
};

export default AppBar;
