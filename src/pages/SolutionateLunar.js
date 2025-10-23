import { Suspense, useState } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import { getAuthToken, getIsAdmin, getIsProcuror, getUserId, tokenLoader } from "../util/auth";
import SolutiiLunareList from "../components/SolutiiLunareList";
import ArestatiList from "../components/ArestatiList";
import SolutiiFapteList from "../components/SolutiiFapteList";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SolutiiLunarPage = () => {
  const { solutii, arestati, solutiiFapte } = useLoaderData();
  const [solutiiVizibile, setSolutiiVizibile] = useState(true);
  const [solutiiFapteVizibile, setSolutiiFapteVizibile] = useState(false);

  return (
    <>
      <button onClick={() => setSolutiiVizibile(!solutiiVizibile)} style={{ zIndex: "1", position: "relative", marginBottom: "-64px", borderRadius: "6px", padding: "6px", backgroundColor: "#f6ad1b", color: "white ", verticalAlign: "bottom", fontSize: "20px", marginLeft: "20px" }}>
        {solutiiVizibile ? "arestati" : "solutii"}
      </button>

      <div style={{ display: "flex" }}>
        {!solutiiVizibile && !solutiiFapteVizibile && <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={arestati}>
            {(loadedArestati) => <ArestatiList arestati={loadedArestati} />}
          </Await>
        </Suspense>}

        {solutiiVizibile && !solutiiFapteVizibile && <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={solutii}>
            {(loadedSolutii) => <SolutiiLunareList solutii={loadedSolutii} setSolutiiFapteVizibile={setSolutiiFapteVizibile} solutiiFapteVizibile={solutiiFapteVizibile} />}
          </Await>
        </Suspense>}

        {solutiiFapteVizibile && <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={solutiiFapte}>
            {(loadedSolutii) => <SolutiiFapteList solutii={loadedSolutii} setSolutiiFapteVizibile={setSolutiiFapteVizibile} solutiiFapteVizibile={solutiiFapteVizibile} />}
          </Await>
        </Suspense>}


      </div>
    </>
  );
}

const loadSolutiiFapte = async () => {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();
  const isProcuror = getIsProcuror();
  const userId = getUserId();



  let url = BASE_URL + "/solutionateLunarPeFapte"

  if (isAdmin === "true") {
    url = BASE_URL + "/solutionateLunarPeFapte?isAdmin=1";
  }

  if (isProcuror === "true" && isAdmin === "false") {
    url = BASE_URL + `/solutionateLunarPeFapte?procurorId=1`;
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
}

const loadArestati = async () => {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();
  const isProcuror = getIsProcuror();

  let url = BASE_URL + "/arestati";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    }
  })

  if (!response.ok) {
    throw json({ message: "Could not fetch arestati" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData.arestati;
  }
}
const loadSolutii = async () => {
  const token = getAuthToken();
  const isAdmin = getIsAdmin();
  const isProcuror = getIsProcuror();
  const userId = getUserId();



  let url = BASE_URL + "/solutionateLunar"

  if (isAdmin === "true") {
    url = BASE_URL + "/solutionateLunar?isAdmin=1";
  }

  if (isProcuror === "true" && isAdmin === "false") {
    url = BASE_URL + `/solutionateLunar?procurorId=1`;
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
    solutiiFapte: loadSolutiiFapte(),
    solutii: loadSolutii(),
    arestati: loadArestati()
  });
}


export default SolutiiLunarPage;