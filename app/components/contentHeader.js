import React from "react";

import Youtube from "../componentParts/youtube";
import { getBgImage } from "../modules/formatters";
import withSyncScroll from "../controllers/syncScroll";
import ArticleHeader from "./articleHeader";

class ContentHeader extends React.Component {
  playVideo() {
    this.props.playVideo();
    this.props.changeVideoPosition("relative");
  }

  positionVideo(position, nextProps) {
    const status = nextProps.video.status;
    const state = nextProps.video.visualState;
    const current = nextProps.post.id === nextProps.video.parent;

    if (status === 5 || status === -1) {
      if (state !== "hidden") this.props.changeVideoPosition("hidden");
    } else if (position === "below") {
      if (state !== "fixed") this.props.changeVideoPosition("fixed");
    } else if (!current) {
      if (state !== "fixed") this.props.changeVideoPosition("fixed");
    } else {
      if (state !== "relative") this.props.changeVideoPosition("relative");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post !== undefined && nextProps.post.fetched) {
      this.positionVideo(nextProps.scroll.position, nextProps);
    }
  }

  render() {
    const post = this.props.post;
    const rdy = post !== undefined && post.fetched;
    const postID = post !== undefined ? post.id : null;

    let title = "",
      bg = false,
      video = false,
      unstarted = false,
      imageStyle = {};

    if (post !== undefined && post.fetched) {
      title = post.title.rendered;

      bg = getBgImage(post, "widescreen");
      if (bg === "") bg = getBgImage(post, "medium_large");
      if (bg !== "") imageStyle = { backgroundImage: `url(${bg})` };

      video = post.media !== undefined && post.media.video !== undefined;
      unstarted = video && this.props.video.status === 5;
    }

    const videoPlaying = this.props.video.intent === "play";
    const classname = `content-header${video ? " has-video" : ""}${bg
      ? " has-bg"
      : ""}`;

    return (
      <header className={classname} id="content-header">
        <div className="content-header-image" style={imageStyle} />
        <Youtube parent={postID} post={post} />
        {video &&
          unstarted && (
            <div className="video-play-btn" onClick={this.playVideo.bind(this)}>
              <svg viewBox="0 0 32 32" style={{ fill: this.props.color.hex }}>
                <use xlinkHref="#icon-video" />
              </svg>
            </div>
          )}
        {rdy &&
          !video &&
          post.template !== "home" && <ArticleHeader {...this.props} />}
        {this.props.children}
      </header>
    );
  }
}

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as video from "../actions/video";

function mapStateToProps(state) {
  return {
    video: state.video,
    color: state.color
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...video }, dispatch);
}

const EnhancedHeader = withSyncScroll(ContentHeader, {
  container: "#content-header",
  element: null
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedHeader);
