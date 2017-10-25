import React, { Component } from "react";
import FlickityWrapper from "../componentParts/flkty";
import { Link } from "react-router-dom";
import PostMetaIcons from "./postMetaIcons";
import {
  stripRoot,
  hexToRgb,
  hexToRgba,
  getBgImage
} from "../modules/formatters";

const slideOptions = {
  wrapAround: true,
  loop: true,
  autoPlay: 12000,
  pauseAutoPlayOnHover: false,
  prevNextButtons: false,
  pageDots: false,
  cellSelector: ".slide-item"
};

class SlideItem extends Component {
  render() {
    const post = this.props.post;
    const loaded = post !== undefined && post.fetched;
    const url = loaded ? stripRoot(post.link) : "#";

    const catName = loaded ? post.category.name : "";
    const title = loaded ? post.title.rendered : "";
    const bgImage = loaded ? getBgImage(post, "medium_large") : "";

    const bgColor = loaded ? post.category.color : "#333";
    const bgRGB = hexToRgba(bgColor, "0.8");
    const labelBgStyle = {
      boxShadow: `10px 0 0 ${bgRGB}, -10px 0 0 ${bgRGB}`,
      WebkitBoxShadow: `10px 0 0 ${bgRGB}, -10px 0 0 ${bgRGB}`,
      backgroundColor: bgRGB,
      color: "white"
    };

    return (
      <Link
        to={url}
        className="slide-item"
        data-bg={bgImage}
        style={{ backgroundColor: hexToRgba(bgColor, 0.4) }}
      >
        <div className="slide-item-text">
          <div className="slide-item-cat">
            <span style={labelBgStyle}>{catName}</span>
          </div>
          <div className="slide-item-title">
            <span style={labelBgStyle}>{title}</span>
          </div>
          {loaded && <PostMetaIcons post={post} label />}
        </div>
      </Link>
    );
  }
}

class HomeSlider extends Component {
  constructor() {
    super();
    this.initiated = false;
    this.state = { index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    this.initiateColor(nextProps);
  }

  componentDidMount() {
    this.props.post.home_slider.map(url => this.props.fetchPost(url));
    //this.initiateColor(this.props);
  }

  initiateColor(props) {
    if (this.initiated) return;
    const color = this.getColorByIndex(0);
    if (color) {
      this.props.setThemeColor(color);
      this.initiated = true;
    }
  }

  getColorByIndex(i) {
    const post = this.props.posts.find(
      post => post.link === this.props.post.home_slider[i]
    );

    return post !== undefined && post.fetched ? post.category.color : false;
  }

  getNextSlideIndex(i) {
    const nxt = this.props.post.home_slider[i + 1];
    return nxt === undefined ? 0 : i + 1;
  }

  select(data) {
    const i = data.flkty.selectedIndex;
    const color = this.getColorByIndex(i);
    this.props.setThemeColor(color ? color : "#000");
    this.setState({ index: i });
  }

  render() {
    const post = this.props.post;

    const nxtFill = this.getColorByIndex(
      this.getNextSlideIndex(this.state.index)
    );

    return (
      <FlickityWrapper
        style={{ fill: nxtFill }}
        next
        select={this.select.bind(this)}
        name="home-slider"
        options={slideOptions}
      >
        {this.props.post.home_slider.map((url, i) => {
          const slide = this.props.posts.find(post => post.link === url);
          return <SlideItem key={i} post={slide} wp={this.props.wp} />;
        })}
      </FlickityWrapper>
    );
  }
}

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as posts from "../actions/posts";
import * as color from "../actions/color";

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispachToProps = dispatch => {
  return bindActionCreators({ ...posts, ...color }, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(HomeSlider);
