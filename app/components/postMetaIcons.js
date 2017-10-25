import React, { Component } from "react";
import ContentIcon from "./contentIcon";

import { hexToRgba } from "../modules/formatters";

export default class PostMetaIcons extends Component {
  render() {
    const post = this.props.post;
    const loaded = post !== undefined && post.fetched;

    let bgColor = "#999";
    if (loaded && post.color === undefined) bgColor = post.color;
    if (loaded && post.category !== undefined) bgColor = post.category.color;

    const bgRGB = hexToRgba(bgColor, "0.8");

    const hasVideo = loaded && post.media.video !== undefined;
    const hasAudio = loaded && post.media.audio !== undefined;
    const hasGallery =
      loaded &&
      post.content_blocks.find(block => block.type === "gallery") !== undefined;

    const labelBgStyle = {
      boxShadow: `10px 0 0 ${bgRGB}, -10px 0 0 ${bgRGB}`,
      WebkitBoxShadow: `10px 0 0 ${bgRGB}, -10px 0 0 ${bgRGB}`,
      backgroundColor: bgRGB,
      color: "white"
    };

    return (
      <div className="post-meta-icons">
        {this.props.label && (
          <div style={labelBgStyle} className="meta-label">
            <span>Indhold</span>
          </div>
        )}

        {hasVideo && <ContentIcon bg={bgColor} type="video" />}
        <ContentIcon bg={bgColor} type="text" />
        {hasAudio && <ContentIcon bg={bgColor} type="volume" />}
        {hasGallery && <ContentIcon bg={bgColor} type="gallery" />}
      </div>
    );
  }
}
