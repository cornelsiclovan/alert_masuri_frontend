import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData } from "react-router-dom";
import { getAuthToken, getIsAdmin, getIsProcuror } from "../util/auth";
import IndrumatorList from "../components/IndrumatorList";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const IndrumatorPage = () => {
    const { indrumatoare } = useLoaderData();
    
    return (
        <>
            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={indrumatoare}>
                    {(loadedIndrumatoare) => (
                        <IndrumatorList indrumatoare={loadedIndrumatoare} />
                    )}
                </Await>
            </Suspense>
        </>
    )
}

const loadIndrumatoare = async () => {
    const token = getAuthToken();
    const isAdmin = getIsAdmin();
    const isProcuror = getIsProcuror();

    let url = BASE_URL + "/indrumator";

    if (isAdmin === "true") {
        url = BASE_URL + "/indrumator?isAdmin=1";
    }

    if (isProcuror === "true" && isAdmin === "false") {
        url = BASE_URL + "/indrumator?procurorId=1"
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        },
    });

    if (!response.ok) {
        throw json(
            { message: "Could not indrumatoare" },
            { status: 500 }
        )
    } else {
        const resData = await response.json();
       
        return resData;
    }
}

export function loader() {
    const token = getAuthToken();
    if (!token) {
        return redirect("/auth?mode=login");
    }

    return defer(
        {
            indrumatoare: loadIndrumatoare()
        }
    )
}

export default IndrumatorPage;