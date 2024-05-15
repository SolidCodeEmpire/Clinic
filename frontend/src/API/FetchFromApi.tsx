const API_URL = "http://localhost:8080";

type Setter = React.Dispatch<React.SetStateAction<any>>

function defaultErrorCallback(reason : any) {
  console.log(reason)
}

export class FetchFromAPI {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get( 
    setter: Setter, 
    queryParams: any = {}, 
    errorCallback : (reason: any) => void = defaultErrorCallback
  ) {
    let queryString = `?${Object.keys(queryParams)
        .map(element => `${element}=${queryParams[element]}`)
        .join("&")
      }`;

    return fetch(API_URL + this.endpoint + queryString)
      .then((response) => response.json())
      .then((responseBody) => {
        setter(responseBody)
        return responseBody
      })
      .catch(errorCallback)
  }
}