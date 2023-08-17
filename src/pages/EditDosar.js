import {
  Await,
  defer,
  redirect,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import DosarForm from "../components/DosarForm";
import { Suspense } from "react";
import { getAuthToken } from "../util/auth";

const BASE_URL = process.env.REACT_APP_BASE_URL;


const EditDosarPage = () => {
  const data = useRouteLoaderData("dosar-detail");
  const {procurori} = useLoaderData();
  //return <DosarForm method="patch" dosar={data.dosar}/>;

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading ...</p>}>
      <Await resolve={procurori}>
        {(loadedProcurori) => {
         
          return (
            <DosarForm
              method="patch"
              dosar={data.dosar}
              procurori={loadedProcurori}
            />
          );
        }}
      </Await>
    </Suspense>
  );
};

export default EditDosarPage;

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
