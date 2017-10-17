import React from "react";
import withSyncScroll from "../controllers/syncScroll";

class ContentAside extends React.Component {
  render() {
    const classname = `content-aside layout-${this.props.scroll.position}`;
    return <aside className={classname} id="content-aside" />;
  }
}

export default withSyncScroll(ContentAside, {
  container: "#content-section",
  element: "#content-aside",
  min_width: 1280
});
