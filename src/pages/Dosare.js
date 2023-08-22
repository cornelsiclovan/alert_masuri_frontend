import { Suspense, useState } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import DosareList from "../components/DosareList";
import { getAuthToken, getIsAdmin, getIsProcuror } from "../util/auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;


const DosarePage = () => {
  const { dosare } = useLoaderData();

  return (
    <>
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={dosare}>
        {(loadedDosare) => <DosareList dosare={loadedDosare}/>}
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

  let url = BASE_URL + "/dosar?este_solutionat=0"

  if(isAdmin === "true") {
    url = BASE_URL + "/dosar?isAdmin=1&este_solutionat=0"; 
  }

  if(isProcuror==="true" && isAdmin === "false") {
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



export function loader() {
 

  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    dosare: loadDosare(),
  });
}
