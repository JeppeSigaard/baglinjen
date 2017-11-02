const wp = { ...wp_settings };

import React from "react";

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 150, g: 150, b: 150 };
}

export function hexToRgba(hex, alpha) {
  const result = hexToRgb(hex);
  return `rgba(${result.r},${result.g},${result.b},${alpha})`;
}

export function stripRoot(url) {
  return url.replace(wp.server, "");
}

export function getBgImage(post, size) {
  try {
    return post.featured_image.media_details.sizes[size].source_url;
  } catch (e) {
    return "";
  }
}

export function nl2p(text) {
  let paras = text.split(/[\r\n]+/g),
    resp = [];
  for (let iter = 0; iter < paras.length; iter++) {
    resp.push(<p key={"esvpara-" + iter}>{paras[iter]}</p>);
  }
  return resp;
}

export function ripRep(text) {
  if (typeof text === "undefined" || null === text) {
    return "";
  }
  return text.replace(/\uFFFD/g, "");
}
