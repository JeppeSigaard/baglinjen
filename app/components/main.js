import React from "react";

import SiteHeader from "./siteHeader";
import SiteFooter from "./siteFooter";
import SiteContent from "./siteContent";
import SiteNav from "./siteNav";

import HomeTemplate from "../templates/home";
import ArchiveTemplate from "../templates/archive";
import SingleTemplate from "../templates/single";
import ErrorTemplate from "../templates/error";

class Main extends React.Component {
  constructor() {
    super();
    this.post = undefined;
    this.loading = true;
  }

  setThisPost(props) {
    // Identify this post by URL
    const newPost = props.posts.find(
      post => post.link === window.location.href
    );

    // undefined causes loading
    if (newPost === undefined) {
      this.loading = true;
      return props.fetchPost(window.location.href);
    }

    // Unfetched is ignored
    if (!newPost.fetched) return;

    // Othermerwize we are set to go
    this.loading = false;
    this.post = newPost;
  }

  componentDidMount() {
    this.setThisPost(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setThisPost(nextProps);
  }

  render() {
    const postReady = this.post !== undefined,
      hamburger = this.props.hamburger.show,
      post = this.post;

    let classname = `app${hamburger ? " show-menu" : ""}`;

    classname += this.loading ? " loading" : "";

    if (post !== undefined && post.type !== null) {
      classname += ` type-${post.type}`;
    }

    if (post !== undefined && post.template) {
      classname += ` template-${post.template}`;
    }

    return (
      <div id="app" className={classname}>
        <SiteHeader />
        {!postReady && (
          <SiteContent>
            <SiteNav />
          </SiteContent>
        )}
        {postReady && post.template == "home" && <HomeTemplate post={post} />}
        {postReady &&
          post.template == "archive" && <ArchiveTemplate post={post} />}
        {postReady &&
          post.template == "single" && <SingleTemplate post={post} />}
        {postReady && post.template == "404" && <ErrorTemplate post={post} />}
        <SiteFooter />
      </div>
    );
  }
}

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as posts from "../actions/posts";

const mapStateToProps = state => {
  return {
    posts: state.posts,
    router: state.router,
    hamburger: state.hamburger
  };
};

const mapDispachToProps = dispatch => {
  return bindActionCreators({ ...posts }, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(Main);
