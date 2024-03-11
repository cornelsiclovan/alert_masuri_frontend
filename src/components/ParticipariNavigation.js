import { NavLink } from "react-router-dom";
import classes from "./DosareNavigation.module.css";
import { getIsProcuror } from "../util/auth";

const ParticipariNavigation = () => {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/judiciar"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Penal
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/judiciar/civil"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Civil
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default ParticipariNavigation;
