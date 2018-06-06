import React from "react";
import { preloadImage } from "./imageLoader";

const PreloadImage = ({ src, preload, waitMs }) => {
  if (preload) preloadImage(src, waitMs);
  return <img width="200" height="200" src={src} />;
  // return <img src={src} />;
};

export default PreloadImage;
