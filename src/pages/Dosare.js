import { Suspense, useState } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import DosareList from "../components/DosareList";
import { getAuthToken, getIsAdmin, getIsProcuror } from "../util/auth";
import ProcurorList from "../components/ProcurorList";
import Stoc from "../components/Stoc";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DosarePage = () => {
  const { dosare, stoc } = useLoaderData();


  return (
    <>
     <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={stoc}>
          {(loadedStoc) => <Stoc stoc={loadedStoc} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        
        <Await resolve={dosare}>
          {(loadedDosare) => <DosareList dosare={loadedDosare} />}
        </Await>
      </Suspense>
     
      
    </>
  );
};

export default DosarePage;

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

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch dosare" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData.dosare;
  }
};

const loadProcurori = async () => {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();
  const isProcuror = getIsProcuror();

  let url = BASE_URL + "/user?isProcuror=1";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch procurori" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData.users;
  }
};

const loadStoc = async () => {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();
  const isProcuror = getIsProcuror();

  let url = BASE_URL + "/dateDosareSolutionate/stoc";

  if (isAdmin === "true") {
    url = BASE_URL + "/dateDosareSolutionate/stoc?isAdmin=1";
  }

  if (isProcuror === "true" && isAdmin === "false") {
    url = BASE_URL + `/dateDosareSolutionate/stoc?procurorId=1`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch stoc" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData.stoc;
  }
};

export function loader() {
  const token = getAuthToken();
  if (!token || token === 'EXPIRED') {
    return redirect("/auth?mode=login");
  }

  return defer({
    dosare: loadDosare(),
    procurori: loadProcurori(),
    stoc: loadStoc(),
  });
}
