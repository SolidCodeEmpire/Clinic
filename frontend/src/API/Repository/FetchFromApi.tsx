const API_URL = "http://localhost:8080";

function defaultErrorCallback(reason: any) {
  console.log(reason)
}

export function getRequest(
  endpoint: string,
  queryParams: any = {},
  pathVariables: any = {},
  errorCallback: (reason: any) => void = defaultErrorCallback
) {
  let token = localStorage.getItem("token") as string;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token)

  const requestOptions = {
    method: "GET",
    headers: myHeaders
  };
  
  let queryString = `?${Object.keys(queryParams)
    .map(element => `${element}=${queryParams[element]}`)
    .join("&")
    }`;

  Object.keys(pathVariables).forEach((key) => {
    endpoint = endpoint.replace(`<:${key}>`, pathVariables[key])
  } );
  

  return fetch(API_URL + endpoint + queryString, {...requestOptions, redirect:"follow"})
    .then((response) => response.json())
    .catch(errorCallback)
}

export function postRequest(
  endpoint: string,
  content: any,
  errorCallback: (reason: any) => void = defaultErrorCallback
) {
  let token = localStorage.getItem("token") as string;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  if(token !== null && endpoint !== "/login"){
    myHeaders.append("Authorization", "Bearer " + token)
  }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(content)
  };

  return fetch(API_URL + endpoint, {...requestOptions, redirect: "follow"})
      .catch(errorCallback);
}

export function patchRequest(
  endpoint: string,
  content: any,
  errorCallback: (reason: any) => void = defaultErrorCallback
) {
  let token = localStorage.getItem("token") as string;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token)

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(content)
  };

  return fetch(API_URL + endpoint, {...requestOptions, redirect: "follow"})
      .catch(errorCallback);
}

export function deleteRequest(
  endpoint: string,
  errorCallback: (reason: any) => void = defaultErrorCallback
) {
  let token = localStorage.getItem("token") as string;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token)

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  return fetch(API_URL + endpoint, {...requestOptions, redirect: "follow"})
      .catch(errorCallback);
}