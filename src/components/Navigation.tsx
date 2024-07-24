import { FC } from "react";

import { Link } from "wouter";

import { navItems } from "../router";

const NavBar: FC = () => {
  return (
    <nav>
      <ul className="flex flex-row items-center">
        {navItems.map((item) => (
          <li key={item.url}>
            <Link href={item.url}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
