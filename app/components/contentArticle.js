import React, { Component } from "react";

import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import ArticleFooter from "./ArticleFooter";

export default class ContentArticle extends Component {
  render() {
    return (
      <article className="content-article">
        <ArticleHeader {...this.props} />
        <ArticleContent {...this.props} />
        <ArticleFooter {...this.props} />
      </article>
    );
  }
}
