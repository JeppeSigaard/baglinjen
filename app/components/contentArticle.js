import React, { Component } from "react";

import ArticleHeader from "./articleHeader";
import ArticleByline from "./articleByline";
import ArticleContent from "./articleContent";
import ArticleFooter from "./articleFooter";

export default class ContentArticle extends Component {
  render() {
    const post = this.props.post;
    const rdy = post !== undefined && post.fetched;
    const video = rdy && post.media.video !== undefined;

    return (
      <article className="content-article">
        {(!rdy || video) && <ArticleHeader byline {...this.props} />}
        <ArticleByline {...this.props} />
        <ArticleContent {...this.props} />
        <ArticleFooter {...this.props} />
      </article>
    );
  }
}
