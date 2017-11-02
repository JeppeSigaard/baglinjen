import React from "react";
import { Link } from "react-router-dom";
import SiteNavCat from "./SiteNavCat";
import withSyncScroll from "../controllers/syncScroll";
import { connect } from "react-redux";

import { stripRoot } from "../modules/formatters";

const mapStateToProps = state => {
  return {
    color: state.color,
    categories: state.categories
  };
};

class SiteNav extends React.Component {
  constructor() {
    super();
  }

  render() {
    const post = this.props.post;
    const rdy = post !== undefined && post.fetched;
    const cat = rdy && post.category !== undefined ? post.category : false;
    const cats = this.props.categories;
    const catRdy = cat && cats.find(c => c.id === cat.id);

    let classname = `site-nav layout-${this.props.scroll.position}`;
    if (!rdy || (post.type === "post" && !catRdy)) classname += " loading";
    return (
      <nav className={classname} id="site-nav">
        {catRdy && <SiteNavCat post={post} cat={catRdy} />}
      </nav>
    );
  }
}

const EnhancedNav = withSyncScroll(SiteNav, {
  container: "#site-content",
  element: null,
  min_width: 920
});

export default connect(mapStateToProps)(EnhancedNav);
