import React from "react";
import { preloadImage } from "./imageLoader";

const PreloadImage = ({
  src,
  preload,
  width,
  height,
  shouldFixImageSize,
  waitMs
}) => {
  if (preload) preloadImage(src, waitMs);
  let props = { src, width };
  if (shouldFixImageSize) {
    props = { ...props, height };
  }
  return <img {...props} />;
};

export default PreloadImage;
