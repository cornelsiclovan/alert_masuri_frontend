import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AuthenticationPage = () => {
  return <AuthForm />;
};

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsuported mode." }, { status: 422 });
  }

  const data = await request.formData();

  let authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode !== "login") {
    authData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      repeatPassword: data.get("repeatPassword"),
    };
  }

  console.log(authData);

  const response = await fetch(`${BASE_URL}`+ "/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });


  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  const isAdmin = resData.isAdmin;
  const isProcuror = resData.isProcuror;
  const isGrefier = resData.isGrefier;
  const userId = resData.userId;

  if(mode === "login") {
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("isGrefier", isGrefier),
    localStorage.setItem("isProcuror", isProcuror),
    localStorage.setItem("userId", userId)
  
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 10);
    localStorage.setItem("expiration", expiration.toISOString());
  }

 
  

  if (mode === "signup") {
    console.log(mode);
    return redirect("/auth?mode=login");
  } 
    
  return redirect("/");
};

export default AuthenticationPage;
