const API_URL = "http://localhost:8080";

type Setter = React.Dispatch<React.SetStateAction<any>>

function defaultErrorCallback(reason: any) {
  console.log(reason)
}

function defaultCustomFilter(response : any) {
  return true
}

export function fetchFromAPI(
  endpoint: string,
  setter: Setter,
  queryParams: any = {},
  pathVariables: any = {},
  customFilter: (response: any) => boolean = defaultCustomFilter,
  errorCallback: (reason: any) => void = defaultErrorCallback
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders
  };
  
  let queryString = `?${Object.keys(queryParams)
    .map(element => `${element}=${queryParams[element]}`)
    .join("&")
    }`;

  Object.keys(pathVariables).forEach((key) => endpoint.replace(`<:${key}>`, pathVariables[key]));

  return fetch(API_URL + endpoint + queryString, {...requestOptions, redirect:"follow"})
    .then((response) => response.json())
    .then((responseBody) => {
      setter(responseBody.filter(customFilter))
      return responseBody
    })
    .catch(errorCallback)
}

export function submitToAPI(
  endpoint: string,
  content: any,
  errorCallback: (reason: any) => void = defaultErrorCallback
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(content)
  };

  return fetch(API_URL + endpoint, {...requestOptions, redirect: "follow"})
      .catch(errorCallback);
}