import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "./img/logo.png";
import { useEffect, useState } from "react";

const MainNavigation = () => {
  const { token, isAdmin } = useRouteLoaderData("root");
  const [dataupdate, setDataUpdate]= useState(localStorage.getItem("dataupdate"));

  let test = "";

  useEffect(() => {
    //dataupdate = localStorage.getItem("dataupdate");
    console.log(dataupdate)
  }, [token, dataupdate]);

  if (useRouteLoaderData("dosar")) {
    const { stoc } = useRouteLoaderData("dosar");
    let promise = new Promise((resolve, reject) => {
      resolve(stoc);
    });

    if (promise && localStorage.getItem("token")) {
      if (!localStorage.getItem("dataupdate")) {
        promise.then((data) => {
          let ora = data[0].createdAt.split("T")[1].split(".")[0].split(":")[0];
          let minutul = data[0].createdAt
            .split("T")[1]
            .split(".")[0]
            .split(":")[1];
          ora = +ora + 3;

          setDataUpdate(
            "update:" +
            data[0].createdAt.split("T")[0] +
            " " +
            ora +
            ":" +
            minutul)

            console.log("dataupdate",dataupdate)

          localStorage.setItem(
            "dataupdate",
            "update:" +
              data[0].createdAt.split("T")[0] +
              " " +
              ora +
              ":" +
              minutul
          );
        });
      }
    }
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <div className={classes.mainList}>
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
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  Dosare
                </NavLink>
              </li>
            )}
             {token && (
              <li>
                <NavLink
                  to="/indrumator"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                Îndrumator
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <NavLink
                  to="/dosareCuAc"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Dosare cu AC <br /> in supraveghere
                </NavLink>
              </li>
            )}
            {/* {token && (
              <li>
                <NavLink
                  to="/dosare-solutionate"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Statistica
                </NavLink>
              </li>
            )} */}
            {token && (
              <li>
                <NavLink
                  to="/incarcatura"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Încarcatura procuror
                </NavLink>
              </li>
            )}

            {token && (
              <li>
                <NavLink
                  to="/solutionate-lunar"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Statistică
                </NavLink>
              </li>
            )}

            {token && (
              <li>
                <NavLink
                  to="/ordine"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Ordine
                </NavLink>
              </li>
            )}

            {token && (
              <li>
                <NavLink
                  to="/judiciar"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Judiciar
                </NavLink>
              </li>
            )}

            {token && (
              <li>
                <NavLink
                  to="/calcul-termen"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Calcul Termen
                </NavLink>
              </li>
            )}

            {token && (
              <li>
                <Form action="/logout" method="post">
                  <button style={{ backgroundColor: "white" }}>Logout</button>
                </Form>
              </li>
            )}

            {token && <li style={{ fontSize: "13px" }}>{dataupdate}</li>}
          </div>

          {token && (
            <li style={{ display: "flex" }}>
              <img src={logo} width={150} height={50} />
              {/* <div

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
              </div> */}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
