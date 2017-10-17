import React from "react";
import YoutubeAPI from "youtube-player";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as video from "../actions/video";

const mapStateToProps = state => {
  return { video: state.video };
};

const mapDispachToProps = dispatch => {
  return bindActionCreators({ ...video }, dispatch);
};

class Youtube extends React.Component {
  constructor() {
    super();
    this.video = null;
    this.state = {
      playerState: "loading",
      status: 3,
      videoId: null,
      intent: "pause",
      parent: null
    };
  }

  onReady() {
    this.setState({ playerState: "unstarted", status: -1 });
  }

  onChange(e) {
    if (!e.data) return;
    let newState = "";

    // unstarted
    if (e.data == -1) newState = "unstarted";

    // ended
    if (e.data == 0) newState = "ended";

    // playing
    if (e.data == 1) newState = "playing";

    // paused
    if (e.data == 2) newState = "paused";

    // buffering
    if (e.data == 3) newState = "buffering";

    // cued
    if (e.data == 5) newState = "cued";

    this.setState({ playerState: newState, status: e.data });
    this.props.setVideoState(e.data);
  }

  componentWillReceiveProps(props) {
    const intent = props.video.intent,
      oldIntent = this.state.intent,
      videoId = props.video.videoId,
      oldVideoId = this.state.videoId;

    if (videoId !== oldVideoId) {
      this.video.cuePlaylist(videoId);
      this.video.seekTo(0);
      this.props.pauseVideo();
    }

    if (intent == "play" && oldIntent !== "play") {
      this.video.playVideo();
    }

    if (intent == "pause" && oldIntent !== "pause") {
      this.video.pauseVideo();
    }

    // Save for next pass-thorugh
    this.setState({ intent, videoId });
  }

  componentDidMount() {
    const videoId = this.props.video.videoId;
    this.video = YoutubeAPI("site-header-video", {
      videoId,
      playlist: videoId,
      playerVars: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        disablekb: 1,
        controls: 0,
        enablejsapi: 1
      }
    });

    this.video.on("ready", this.onReady.bind(this));
    this.video.on("stateChange", this.onChange.bind(this));

    this.setState({ videoId });
  }

  render() {
    let wrapperClass = `video-wrapper state-${this.state.playerState}`;
    wrapperClass += ` position-${this.props.video.visualState}`;

    return (
      <div className={wrapperClass}>
        <div className="video-wrapper-overlay" />
        <span id="site-header-video" />
        <div className="video-controls">
          <button>></button>
          <button>||</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Youtube);
