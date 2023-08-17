import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import HomePage from "./pages/Home";
import DosareRootLayout from "./pages/DosareRoot";
import DosarePage, { loader as dosareLoader } from "./pages/Dosare";
import NewDosarPage, { loader as formDataLoader } from "./pages/NewDosar";
import { action as manipulateDosarAction } from "./components/DosarForm";
import DosarDetailPage, {
  loader as dosarDetailLoader,
  action as deleteDosarAction,
} from "./pages/DosarDetail";
import EditDosarPage, {
  loader as procuroriLoaderData,
} from "./pages/EditDosar";
import DosareSolutionatePage, {
  loader as dosareSolutionateLoader,
} from "./pages/DosareSolutionate";

const { createBrowserRouter, RouterProvider } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "dosare",
        element: <DosareRootLayout />,
        children: [
          {
            index: true,
            element: <DosarePage />,
            loader: dosareLoader,
          },
          {
            path: ":dosarId",
            id: "dosar-detail",
            loader: dosarDetailLoader,
            children: [
              {
                index: true,
                element: <DosarDetailPage />,
                action: deleteDosarAction,
              },
              {
                path: "edit",
                element: <EditDosarPage />,
                loader: procuroriLoaderData,
                action: manipulateDosarAction,
              },
            ],
          },
          {
            path: "nou",
            element: <NewDosarPage />,
            loader: formDataLoader,
            action: manipulateDosarAction,
          },
        ],
      },
      {
        path: "dosare-solutionate",
        element: <DosareSolutionatePage />,
        loader: dosareSolutionateLoader,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
