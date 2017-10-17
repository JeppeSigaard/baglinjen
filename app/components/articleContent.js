import React, { Component } from "react";
import PostList from "./postList";
import { Link } from "react-router-dom";

export default class ArticleContent extends Component {
  render() {
    const post = this.props.post,
      postReady = post !== undefined && post.fetched !== false;

    let content = postReady ? post.content.rendered : "";

    return (
      <section className="article-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {postReady &&
          post.posts !== undefined && <PostList list={post.posts} />}
      </section>
    );
  }
}
