import Index from "../views/Index";
import Login from "../views/Login";
import Register from "../views/Register";
import TaskCreate from "../views/TaskCreate";
import Logout from "../views/Logout";

import { Route, Switch } from "wouter";

interface NavItem {
  name: string;
  url: string;
  component: React.ComponentType;
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    url: "/",
    component: Index,
  },
  {
    name: "Login",
    url: "/login",
    component: Login,
  },
  {
    name: "Register",
    url: "/register",
    component: Register,
  },
  {
    name: "Task create",
    url: "/new-task",
    component: TaskCreate,
  },
  {
    name: "Logout",
    url: "/logout",
    component: Logout,
  },
];

export function SwitchComponent() {
  return (
    <Switch>
      <>
        {navItems.map((item) => (
          // @ts-ignore
          <Route key={item.url} path={item.url} component={item.component} />
        ))}
      </>
    </Switch>
  );
}
