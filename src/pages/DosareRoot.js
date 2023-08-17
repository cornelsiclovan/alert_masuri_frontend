import { Outlet } from "react-router-dom";
import DosareNavigation from "../components/DosareNavigation";

const DosareRootLayout = () => {
  return (
    <>
      <DosareNavigation />
      <Outlet />
    </>
  );
};

export default DosareRootLayout;
