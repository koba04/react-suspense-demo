import { createCache, createResource } from "simple-cache-provider";

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function callApi([user, waitMs]) {
  return wait(waitMs).then(() =>
    fetch(`https://api.github.com/users/${user}/starred`).then(res =>
      res.json()
    )
  );
}

const cache = createCache();
const fetcher = createResource(callApi, ([k]) => k);

export function getApiData(user, waitMs) {
  return fetcher.read(cache, [user, waitMs]);
}
