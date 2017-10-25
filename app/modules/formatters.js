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

export function scroll(to, duration, elem) {
  if (elem.scrollTop == to) return;
  const diff = to - elem.scrollTop;
  const scrollStep = Math.PI / (duration / 10);
  let count = 0;
  let currPos;
  const start = elem.scrollTop;
  let scrollInterval = setInterval(function() {
    const top = elem.scrollTop;
    if (top !== to) {
      count = count + 1;
      currPos = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
      elem.scrollTop = currPos;
    } else {
      clearInterval(scrollInterval);
    }
  }, 10);

  setTimeout(() => {
    clearInterval(scrollInterval);
  }, duration + 10);
}
