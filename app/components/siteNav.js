import React from "react";
import { Link } from "react-router-dom";

import SiteNavCat from "./SiteNavCat";

import { bindActionCreators } from "redux";
import * as categories from "../actions/categories";
import withSyncScroll from "../controllers/syncScroll";
import { connect } from "react-redux";

import { stripRoot } from "../modules/formatters";

const mapStateToProps = state => {
  return {
    color: state.color,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...categories }, dispatch);
};

class SiteNav extends React.Component {
  constructor() {
    super();
    this.post = { fetched: false, id: null };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.post !== undefined &&
      nextProps.post.fetched &&
      nextProps.post.id !== this.post.id &&
      nextProps.post.category !== undefined
    ) {
      this.catLoaded = false;
      this.post = nextProps.post;
      this.props.fetchCategory(nextProps.post.category.id);
    }
  }

  componentDidMount() {
    if (
      this.props.post !== undefined &&
      this.props.post.fetched &&
      this.props.post.category !== undefined
    ) {
      this.post = this.props.post;
      this.props.fetchCategory(this.props.post.category.id);
    }
  }

  render() {
    const post = this.props.post;
    const rdy = post !== undefined && post.fetched;
    const cat = rdy && post.category !== undefined ? post.category : false;
    const cats = this.props.categories;
    const catRdy = cat && cats.find(c => c.id === cat.id) !== undefined;
    const catFetched = catRdy && cats.find(c => c.id === cat.id);

    let classname = `site-nav layout-${this.props.scroll.position}`;
    if (!rdy || (post.type === "post" && !catRdy)) classname += " loading";
    return (
      <nav className={classname} id="site-nav">
        {catRdy &&
          catFetched.fetched && <SiteNavCat post={post} cat={catFetched} />}
      </nav>
    );
  }
}

const EnhancedNav = withSyncScroll(SiteNav, {
  container: "#site-content",
  element: null,
  min_width: 920
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedNav);
