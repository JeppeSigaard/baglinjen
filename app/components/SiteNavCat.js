import React, { Component } from "react";
import PostBox from "./postBox";
import { stripRoot } from "../modules/formatters";
import { scroll } from "../modules/manipulators";

export default class SiteNavCat extends Component {
  constructor() {
    super();
    this.post_id = null;
    this.cat_loaded = false;
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

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.cat.fetched;
  }

  componentWillReceiveProps(nextProps) {
    const cat = nextProps.cat;
    if (!this.cat_loaded && cat.fetched) {
      this.cat_loaded = cat.id;
      setTimeout(() => {
        this.navigateTo(this.props.post.link);
      }, 50);
    }
  }

  componentDidMount() {
    this.cat_loaded = false;
  }

  render() {
    const cat = this.props.cat;
    const related = `related-posts${cat.fetched ? "" : " loading"}`;

    const post = this.props.post;
    if (post.id !== this.post_id && cat.fetched) {
      this.post_id = post.id;
      this.navigateTo(post.link);
    }

    return (
      <div className={related}>
        {cat.fetched && (
          <header
            style={{ backgroundColor: cat.color }}
            className="related-posts-header"
          >
            <h3>{cat.name}</h3>
            <span>{`${cat.count} indlæg`}</span>
          </header>
        )}
        {cat.fetched && (
          <div className="related-posts-content">
            {cat.posts.map((item, i) => {
              return <PostBox key={i} post={item.link} />;
            })}
          </div>
        )}
      </div>
    );
  }
}
