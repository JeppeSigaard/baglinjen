import React, { Component } from "react";
import { Link } from "react-router-dom";
import { stripRoot } from "../modules/formatters";

export default class ArticleByline extends Component {
  render() {
    const post = this.props.post;
    const rdy = post !== undefined && post.fetched;

    if (rdy && post.authors === undefined) return null;

    const bgColor = rdy && post.color !== undefined ? post.color : "#999";

    return (
      <div
        className="article-byline"
        style={{ borderBottom: `1px solid ${bgColor}` }}
      >
        <span className="prfx">Af </span>
        {rdy &&
          post.authors.map((a, i) => {
            let postfix = "";
            if (i === post.authors.length - 2) postfix = " og ";
            else if (i !== post.authors.length - 1) postfix = ", ";

            const link = a.link !== undefined ? stripRoot(a.link) : "#";

            return (
              <Link to={link} className="author" key={i}>
                {a.name + postfix}
              </Link>
            );
          })}
      </div>
    );
  }
}
