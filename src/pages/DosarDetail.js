import { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import DosarItem from "../components/DosarItem";
import DosareList from "../components/DosareList";
import { getAuthToken, getIsAdmin, getIsProcuror } from "../util/auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DosarDetailPage = () => {
  let isAc = false;
  let isAn = false;
  let routeloader = "dosar-detail";
  if (window.location.href.includes("dosareCuAc")) {
    routeloader = "dosarac-detail";
    isAc = true;
  }


  if (window.location.href.includes("dosareCuAn")) {
    routeloader = "dosaran-detail";
    
    isAn = true;
  }

  const { dosar, dosare, procurori } = useRouteLoaderData(routeloader);

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
        <Await resolve={dosar}>
          {(loadedDosar) => <DosarItem dosar={loadedDosar} isAc={isAc} isAn={isAn}/>}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
        <Await resolve={dosare}>
          {(loadedDosare) => <DosareList dosare={loadedDosare} isAc={isAc} isAn={isAn}/>}
        </Await>
      </Suspense>
    </>
  );
};

export default DosarDetailPage;

const loadDosar = async (id) => {
  const token = getAuthToken();

  const response = await fetch(`${BASE_URL}/dosar/` + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Nu am putut accesa dosarul!" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.dosar;
  }
};

const loadDosare = async () => {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();
  const isProcuror = getIsProcuror();

  let url = BASE_URL + "/dosar?este_solutionat=0";

  if (isAdmin === "true") {
    url = BASE_URL + "/dosar?isAdmin=1&este_solutionat=0";
  }

  if (isProcuror === "true" && isAdmin === "false") {
    url = BASE_URL + "/dosar?procurorId=1&este_solutionat=0";
  }

  if (window.location.href.includes("dosareCuAc")) {
    if (isAdmin === "true") {
      url = BASE_URL + "/dosar/dosareCuAc?isAdmin=1&este_solutionat=0";
    }
  
    if (isProcuror === "true" && isAdmin === "false") {
      url = BASE_URL + "/dosar/dosareCuAc?procurorId=1&este_solutionat=0";
    }
  }

  // if(isGrefier) {

  // }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Nu am putut accesa dosarele" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.dosare;
  }
};

const loadUsers = async () => {
  const token = getAuthToken();

  const response = await fetch(`${BASE_URL}/user?isProcuror=1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch users!" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData.users;
  }
};

export const loader = async ({ request, params }) => {
  const dosarId = params.dosarId;
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }
  return defer({
    dosar: await loadDosar(dosarId),
    dosare: loadDosare(),
    procurori: loadUsers(),
  });
};

export async function action({ params, request }) {
  const dosarId = params.dosarId;
  const token = getAuthToken();

  const response = await fetch(`${BASE_URL}/dosar/` + dosarId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.json();
    throw json(
      {
        message: errorMessage.message,
      },
      { status: 500 }
    );
  }
  return redirect("/dosare");
}
