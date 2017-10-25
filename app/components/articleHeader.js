import React, { Component } from "react";

import PostMetaIcons from "./postMetaIcons";

import { hexToRgba } from "../modules/formatters";

export default class ArticleHeader extends Component {
  render() {
    const post = this.props.post;
    const rdy = post !== undefined && post.fetched;

    const title = rdy ? post.title.rendered : "";

    const bgColor = rdy && post.color !== undefined ? post.color : "#999";
    const bgRGB = hexToRgba(bgColor, "0.8");
    const labelBgStyle = {
      boxShadow: `10px 0 0 ${bgRGB}, -10px 0 0 ${bgRGB}`,
      WebkitBoxShadow: `10px 0 0 ${bgRGB}, -10px 0 0 ${bgRGB}`,
      backgroundColor: bgRGB,
      color: "white"
    };

    return (
      <div className="article-header">
        <h1 className="article-title">
          <span style={labelBgStyle}>{title}</span>
        </h1>
        {rdy && <PostMetaIcons post={post} label />}
      </div>
    );
  }
}
