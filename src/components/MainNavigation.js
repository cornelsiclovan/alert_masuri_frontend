import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { token, isAdmin } = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <div className={classes.mainList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Acasa
              </NavLink>
            </li>
            {!token && (
              <li>
                <NavLink
                  to="/auth?mode=login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Autentificare
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <NavLink
                  to="/dosare"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Dosare
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <NavLink
                  to="/dosare-solutionate"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Dosare solutionate
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
            )}
          </div>

          {token && (
            <li style={{ display: "flex" }}>
              <div
                style={{
                  backgroundColor: "red",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderRadius: "50%",
                }}
              >
                Alerte
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
