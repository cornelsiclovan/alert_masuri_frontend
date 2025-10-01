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
import DosareCuAcPage, { loader as dosareCuAcLoader } from "./pages/DosareAC";
import SolutiiLunarPage, { loader as dosareSolutionateLunarLoader } from "./pages/SolutionateLunar";
import IncarcaturaPage, { loader as incarcaturaLoader } from "./pages/Incarcatura";
import ParticiparePage, { loader as participareLoader } from "./pages/Participari";
import OrdinePage, { loader as ordineLoader, action as ordineAction } from "./pages/Ordine";
import CalculTermenPage from "./pages/CalculTermen";
import IndrumatorPage, { loader as indrumatorLoader } from "./pages/Indrumator";



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
        path: "",
        element: <DosareRootLayout />,
        children: [
          {
            index: true,
            element: <DosarePage />,
            id: "dosar",
            loader: dosareLoader,
          },
          {
            path: "/dosare/:dosarId",
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
            path: "indrumator",
            element: <IndrumatorPage />,
            loader: indrumatorLoader
          },
          {
            path: "nou",
            element: <NewDosarPage />,
            loader: formDataLoader,
            action: manipulateDosarAction,
          },
          {
            path: "dosareCuAc",
            element: <DosareCuAcPage />,
            loader: dosareCuAcLoader,
          },
          {
            path: "/dosareCuAc/:dosarId",
            id: "dosarac-detail",
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
        ],
      },
      {
        path: "dosare-solutionate",
        element: <DosareSolutionatePage />,
        loader: dosareSolutionateLoader,
      },
      {
        path: "solutionate-lunar",
        element: <SolutiiLunarPage />,
        loader: dosareSolutionateLunarLoader,
      },
      {
        path: "incarcatura",
        element: <IncarcaturaPage />,
        loader: incarcaturaLoader
      },
      {
        path: "ordine",
        element: <OrdinePage />,
        loader: ordineLoader,
        action: ordineAction
      },
      {
        path: "judiciar",
        id: "judiciar",
        children: [
          {
            index: true,
            element: <ParticiparePage />,
            loader: participareLoader
          }, {
            path: "civil",
            element: <ParticiparePage />,
            loader: participareLoader
          }
        ]
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "calcul-termen",
        element: <CalculTermenPage />,
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
