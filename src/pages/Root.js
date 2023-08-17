const { useEffect } = require("react");
const { useLoaderData, useSubmit, Outlet } = require("react-router-dom");
const { getTokenDuration } = require("../util/auth");
const { default: MainNavigation } = require("../components/MainNavigation");

const RootLayout = () => {
  const loginData = useLoaderData();

  const token = loginData.token;

  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
