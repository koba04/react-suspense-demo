import { createCache, createResource } from "simple-cache-provider";

function callApi() {
  return fetch("https://api.github.com/users/koba04/starred").then(res =>
    res.json()
  );
}

const cache = createCache(() => {});
const fetcher = createResource(callApi);

export function getApiData() {
  return fetcher.read(cache);
}
