import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "A aparut o eroare!";
  let message = "Ceva nu a mers bine";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Nu am gasit aceasta resursa";
    message = "Nu am gasit aceasta resursa sau pagina";
  }

  return (
    <>
    <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
