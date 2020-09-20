import { BASEURL } from "../../constants";

export const signup = (user) => {
  return fetch(`${BASEURL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log("response ", response);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signin = (user) => {
  return fetch(`${BASEURL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${BASEURL}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Signout success");
      })
      .catch((error) => {
        console.log("Signout failed with error: ", error);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    let flag = JSON.parse(localStorage.getItem("jwt"));
    return flag;
  } else {
    console.log("returning false");
    return false;
  }
};
