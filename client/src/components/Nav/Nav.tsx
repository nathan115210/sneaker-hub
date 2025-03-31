import type { RouteProps } from "../../App.tsx";
import { useLocation } from "react-router-dom";
import "./Nav.scss";

const Nav = ({ routes }: { routes: RouteProps[] }) => {
  const pathname = useLocation().pathname;
  console.log("pathname", pathname);
  const isActive = (path: string): boolean => {
    return path === pathname;
  };
  return (
    <nav className="nav">
      <ul>
        {routes.map(
          (route) =>
            route.showOnNav !== false && (
              <li
                key={route.path}
                className={isActive(route.path) ? "active" : ""}
              >
                <a href={route.path}>{route.name}</a>
              </li>
            ),
        )}
      </ul>
    </nav>
  );
};
export default Nav;
