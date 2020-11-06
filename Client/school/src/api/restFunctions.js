import { store } from "react-notifications-component";
import { alertError } from "../consts/reactAlert";
import { serverIP } from "./apiConfig";

export const get = async (url) => {
  const response = await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": `${serverIP}`,
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 401) {
        console.log("Unauthorized request: ", url);
      }
      return res;
    })
    .catch((err) => {
      console.log("Error loading resource: ", url);
    });

  if (!response) {
    alertError("שגיאה בטעינת נתונים מהשרת");
    return false;
  } else if (!response.ok) {
    return false;
  } else {
    return response.json();
  }
};

export const post = async (
  url,
  body,
  contentType = "application/json",
  contentLength = 10000000
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: getPostHeaders(contentType),
    credentials: "include",
    body: contentType === "application/json" ? JSON.stringify(body) : body,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Error with post request: ", url);
    });

  if (response.status === 401) {
    return false;
  } else {
    let resData = await response.json();
    return resData;
  }
};

export const del = async (url, body) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": `application/json`,
      Accept: "application/json",
      "Access-Control-Allow-Origin": `${serverIP}`,
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("Error with delete request: ", url);
    });

  if (response.status === 401) {
    return false;
  } else {
    let resData = await response.json();
    return resData;
  }
};

export const put = async (url) => {
  const response = await fetch(url, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": `${serverIP}`,
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 401) {
        console.log("Unauthorized request: ", url);
      }
      return res;
    })
    .catch((err) => {
      console.log("Error loading resource: ", url);
    });

  if (response.status === 401) {
    return false;
  } else {
    let resData = await response.json();
    return resData;
  }
};

const getPostHeaders = (contentType = "application/json") => {
  let header = {
    Accept: `${contentType}`,
    "Access-Control-Allow-Origin": `${serverIP}`,
    "Access-Control-Allow-Credentials": "true",
  };

  if (contentType === "application/json") {
    header["Content-Type"] = contentType;
  }

  return header;
};
