import React from "react";

import SiteHeader from "./siteHeader";
import SiteFooter from "./siteFooter";
import SiteContent from "./siteContent";
import SiteNav from "./siteNav";
import ContentSection from "../components/contentSection";
import ContentHeader from "../components/contentHeader";
import ContentMain from "../components/contentMain";
import ContentAside from "../components/contentAside";

import HomeSlider from "../components/homeSlider";
import HomeCategorySection from "../components/homeCategories";

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

    // Ignore the rest if no change
    if (this.post === newPost) return;
    this.post = newPost;

    if (
      newPost.category !== undefined &&
      newPost.category.color !== undefined
    ) {
      this.props.setThemeColor(newPost.category.color);
    }

    if (
      newPost.media !== undefined &&
      newPost.media.video !== undefined &&
      this.props.video.parent !== newPost.id
    ) {
      this.props.pauseVideo(newPost.media.video, newPost.id);
    }
  }

  componentDidMount() {
    this.setThisPost(this.props);

    this.props.fetchSponsors();
  }

  componentWillReceiveProps(nextProps) {
    this.setThisPost(nextProps);
  }

  render() {
    const postReady = this.post !== undefined,
      hamburger = this.props.hamburger.show,
      post = postReady
        ? { ...this.post, color: this.props.color.hex }
        : this.post,
      template = postReady ? post.template : "loading",
      type = postReady ? post.type : "loading",
      description = this.props.wp.description;

    let classname = `app${hamburger ? " show-menu" : ""}`;

    classname += this.loading ? " loading" : "";
    classname += ` type-${type}`;
    classname += ` template-${template}`;

    return (
      <div id="app" className={classname}>
        <SiteHeader {...this.props} />
        <SiteContent>
          <SiteNav post={post} />
          <ContentHeader post={post}>
            {template === "home" && <HomeSlider post={post} />}
          </ContentHeader>
          <ContentSection>
            {template === "home" && (
              <div className="site-description">{description}</div>
            )}
            {template === "home" && <HomeCategorySection />}

            {template !== "home" && <ContentMain post={post} />}
            {template !== "home" && (
              <ContentAside posts={this.props.posts} video={this.props.video} />
            )}
          </ContentSection>
        </SiteContent>
        <SiteFooter {...this.props} />
      </div>
    );
  }
}

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as posts from "../actions/posts";
import * as color from "../actions/color";
import * as video from "../actions/video";

const mapStateToProps = state => {
  return {
    posts: state.posts,
    router: state.router,
    video: state.video,
    hamburger: state.hamburger,
    wp: state.wp,
    color: state.color
  };
};

const mapDispachToProps = dispatch => {
  return bindActionCreators({ ...posts, ...color, ...video }, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(Main);
