import { NavLink } from "react-router-dom";
import classes from "./DosareNavigation.module.css";
import { getIsProcuror } from "../util/auth";

const DosareNavigation = () => {

  const isProcuror = getIsProcuror();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/dosare"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Dosare nesolutionate
            </NavLink>
          </li>
          {isProcuror === "false" && <li>
            <NavLink
              to="/dosare/nou"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Adauga dosar
            </NavLink>
          </li>}
        </ul>

      </nav>
    </header>
  );
};

export default DosareNavigation;
