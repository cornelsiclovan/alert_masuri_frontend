import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import { getAuthToken, getIsAdmin, getIsProcuror } from "../util/auth";
import IncarcaturaList from "../components/IncarcaturaList";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const IncarcaturaPage = () => {
  const { incarcatura } = useLoaderData();

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={incarcatura}>
          {(loadedIncarcatura) => (
            <IncarcaturaList incarcatura={loadedIncarcatura} />
          )}
        </Await>
      </Suspense>
    </>
  );
};

const loadSituatieCuAc = async () => {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();
  const isProcuror = getIsProcuror();

  let url = BASE_URL + "/dosar/dosareCuAcPeProcuror";

  if (isAdmin === "true") {
    url = BASE_URL + "/dosar/dosareCuAcPeProcuror?isAdmin=1&este_solutionat=0";
  }

  if (isProcuror === "true" && isAdmin === "false") {
    url = BASE_URL + "/dosar/dosareCuAcPeProcuror?procurorId=1&este_solutionat=0";
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

    return resData.situatie_cu_ac;
  }
};

export function loader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    incarcatura: loadSituatieCuAc(),
  });
}

export default IncarcaturaPage;
