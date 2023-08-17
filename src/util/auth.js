export const getTokenDuration = () => {
  const storedExpirtationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirtationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};

export const getIsAdmin = () => {
  return localStorage.getItem("isAdmin");
};

export const getIsProcuror = () => {
  return localStorage.getItem("isProcuror");
}

export const getUserId = () => {
  return localStorage.getItem("userId");
}

export const tokenLoader = () => {
  return {
    token: getAuthToken(),
    isAdmin: getIsAdmin(),
    isProcuror: getIsProcuror(),
    userId: getUserId()
  };
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
};
