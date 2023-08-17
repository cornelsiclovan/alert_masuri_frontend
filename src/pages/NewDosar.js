import { Suspense, useEffect } from "react";
import DosarForm from "../components/DosarForm";
import { getAuthToken } from "../util/auth";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const NewDosarPage = () => {
  const { procurori } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
      <Await resolve={procurori}>
        {(loadedProcurori) => (
          <DosarForm method="post" procurori={loadedProcurori} />
        )}
      </Await>
    </Suspense>
  );
};

export default NewDosarPage;

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

export function loader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    procurori: loadUsers(),
  });
}
