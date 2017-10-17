import React from "react";
import ContentArticle from "./contentArticle";

export default class ContentMain extends React.Component {
  render() {
    return (
      <main className="content-main" id="content-main">
        <ContentArticle {...this.props} />
      </main>
    );
  }
}
