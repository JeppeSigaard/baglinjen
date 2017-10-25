import React, { Component } from "react";

import { Link } from "react-router-dom";
import { stripRoot, hexToRgba, getBgImage } from "../modules/formatters";
import PostMetaIcons from "./postMetaIcons";

class PostBox extends Component {
  render() {
    const post = this.props.posts.find(item => item.link === this.props.post);

    const rdy = post !== undefined && post.fetched;
    const link = rdy ? stripRoot(post.link) : "";
    const title = rdy ? post.title.rendered : "";
    const bg = rdy ? getBgImage(post, "postbox") : "";

    const bgColor = rdy ? post.category.color : "#999";
    const bgRGB = hexToRgba(bgColor, "0.8");
    const labelBgStyle = {
      boxShadow: `10px 0 0 ${bgRGB}, -10px 0 0 ${bgRGB}`,
      WebkitBoxShadow: `10px 0 0 ${bgRGB}, -10px 0 0 ${bgRGB}`,
      backgroundColor: bgRGB,
      color: "white"
    };

    const cur_loc = this.props.router.location.pathname;
    const classname = `post-box${cur_loc === link ? " current" : ""}`;

    return (
      <Link to={link} className={classname}>
        {rdy && (
          <div
            data-bg={bg}
            className="post-box-img"
            style={{ backgroundColor: bgRGB }}
          />
        )}
        {rdy && (
          <div className="post-box-title">
            <span style={labelBgStyle}>{title}</span>
          </div>
        )}
        {rdy && <PostMetaIcons post={post} bg={bgRGB} />}
      </Link>
    );
  }
}

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as posts from "../actions/posts";

const mapStateToProps = state => {
  return {
    posts: state.posts,
    router: state.router
  };
};

const mapDispachToProps = dispatch => {
  return bindActionCreators({ ...posts }, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(PostBox);
