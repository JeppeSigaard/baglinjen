import React from "react";
import withSyncScroll from "../controllers/syncScroll";
import MainSponsorSlider from "./mainSponsorSlider";

class ContentAside extends React.Component {
  render() {
    let classname = `content-aside layout-${this.props.scroll.position}`;
    classname += ` video-${this.props.video.visualState}`;
    return (
      <aside className={classname} id="content-aside">
        <div style={{ background: "#333", height: "200px", margin: "10px" }} />
        <div style={{ background: "#333", height: "200px", margin: "10px" }} />
      </aside>
    );
  }
}

export default withSyncScroll(ContentAside, {
  container: "#content-section",
  element: "#content-aside",
  min_width: 1280
});
