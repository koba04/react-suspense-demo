import { createCache, createResource } from "simple-cache-provider";

const preload = url =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

const wait = ms => new Promise(r => setTimeout(r, ms));

const preloadWithWait = ([url, waitMs]) =>
  Promise.all([preload(url), wait(waitMs)]);

const cache = createCache();
const imageLoader = createResource(preloadWithWait, ([k]) => k);

export const preloadImage = (src, waitMs) =>
  imageLoader.read(cache, [src, waitMs]);
