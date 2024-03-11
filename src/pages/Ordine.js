import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import { getAuthToken, getIsAdmin, getIsProcuror } from "../util/auth";
import OrdineList from "../components/OrdineList";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const OrdinePage = () => {
  const { ordine } = useLoaderData();

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={ordine}>
          {(loadedOrdine) => <OrdineList ordine={loadedOrdine} />}
        </Await>
      </Suspense>
    </>
  );
};

export const action = async ({ request, params }) => {
  console.log(request);


  const method = request.method;
  const dataObject = await request.formData();
  
  const data = Object.fromEntries(dataObject);

  // console.log(data.id);

  const formData = new FormData();
  formData.append("numar", data.numar);
  formData.append("descriere", data.descriere);
  formData.append("docs", data.docs);

  let url = BASE_URL + "/ordine";

  if (method === "PATCH" || method === "DELETE") {
    const ordinId = data.id;
    url = BASE_URL + "/ordine/" + ordinId;
  }

  console.log(url, method);

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not save property" },
      { status: response.status }
    );
  }

  return true;
};

const loadedOrdine = async () => {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();
  const isProcuror = getIsProcuror();

  let url = BASE_URL + "/ordine";

  if (isAdmin === "true") {
    url = BASE_URL + "/ordine?isAdmin=1";
  }

  if (isProcuror === "true" && isAdmin === "false") {
    url = BASE_URL + "/ordine?procurorId=1";
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not fetch ordine" }, { status: 500 });
  } else {
    const resData = await response.json();

    return resData.ordine;
  }
};

export function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    ordine: loadedOrdine(),
  });
}

export default OrdinePage;
