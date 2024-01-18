import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import { getAuthToken, getIsAdmin, getIsProcuror, getUserId } from "../util/auth";
import SolutiiLunareList from "../components/SolutiiLunareList";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SolutiiLunarPage = () => {
    const { solutii } = useLoaderData();

    

    return (
        <>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={solutii}>
            {(loadedSolutii) => <SolutiiLunareList solutii={loadedSolutii} />}
          </Await>
        </Suspense>
        </>
      );
}

const loadSolutii = async () => {
    const token = getAuthToken();
    const isAdmin = getIsAdmin();
    const isProcuror = getIsProcuror();
    const userId = getUserId();
  
 

    let url = BASE_URL + "/solutionateLunar"
  
    if(isAdmin === "true") {
      url = BASE_URL + "/solutionateLunar?isAdmin=1"; 
    }
  
    if(isProcuror==="true" && isAdmin === "false") {
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
    console.log("test");
    return defer({
      solutii: loadSolutii(),
    });
  }
  

export default SolutiiLunarPage;