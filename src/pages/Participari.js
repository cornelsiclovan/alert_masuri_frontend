import { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useLoaderData,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
import { getAuthToken, getIsAdmin, getIsProcuror } from "../util/auth";
import ParticipariList from "../components/ParticipariList";
import ParticipariNavigation from "../components/ParticipariNavigation";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ParticiparePage = () => {
  const { participari } = useLoaderData();

  console.log(window.location.href);


  return (
    <>
      <ParticipariNavigation />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={participari}>
          {(loadedParticipari) => (
            <ParticipariList participari={loadedParticipari} />
          )}
        </Await>
      </Suspense>
    </>
  );
};

const loadParticipari = async (civil) => {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();
  const isProcuror = getIsProcuror();

  let url = BASE_URL + "/participari";

  if (isAdmin === "true") {
    url = BASE_URL + "/participari?isAdmin=1";
  }

  if (isProcuror === "true" && isAdmin === "false") {
    url = BASE_URL + "/participari?procurorId=1";
  }


  if (civil === "civil") {
    url = url + "&civil=1";
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch situatie dosare cu ac" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();

    return resData.participari;
  }
};

export function loader({request}) {
  
  console.log(request.url)

  const civil = request.url.includes("civil") ? "civil" : "";

  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    participari: loadParticipari(civil),
  });
}

export default ParticiparePage;
