import { redirect } from "react-router-dom";

export const action = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("initiallogin");
  localStorage.removeItem("isProcuror");
  localStorage.removeItem("userId");
  localStorage.removeItem("isGrefier");
  localStorage.removeItem("dataupdate");
  return redirect("/");
};


