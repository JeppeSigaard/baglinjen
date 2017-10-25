import React, { Component } from "react";
import PostBox from "./postBox";
import { stripRoot, scroll } from "../modules/formatters";

export default class SiteNavCat extends Component {
  constructor() {
    super();
    this.post_id = null;
  }

  navigateTo(link) {
    const container = document.querySelector(".related-posts-content");
    const elem = document.querySelector(
      `.related-posts-content .post-box[href="${stripRoot(link)}"]`
    );

    if (!elem) return;
    const top = container.scrollTop;
    const trueOffset = parseInt(elem.offsetTop);
    const target = top - (top - trueOffset) - 60;

    scroll(target, 200, container);
  }

  componentDidMount() {
    setTimeout(() => {
      this.navigateTo(this.props.post.link);
    }, 200);
  }

  render() {
    const cat = this.props.cat;
    const post = this.props.post;
    if (post.id !== this.post_id) {
      this.post_id = post.id;
      this.navigateTo(post.link);
    }

    return (
      <div className="related-posts">
        <header
          style={{ backgroundColor: cat.color }}
          className="related-posts-header"
        >
          <h3>{cat.name}</h3>
          <span>{`${cat.count} indlæg`}</span>
        </header>
        <div className={myclass} />
        <div className="related-posts-content">
          {cat.posts.map((item, i) => {
            return <PostBox key={i} post={item.link} />;
          })}
        </div>
      </div>
    );
  }
}
