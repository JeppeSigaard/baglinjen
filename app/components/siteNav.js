import React from "react";
import { Link } from "react-router-dom";
import Menu from "./menu";

import withSyncScroll from "../controllers/syncScroll";

class SiteNav extends React.Component {
  render() {
    const classname = `site-nav layout-${this.props.scroll.position}`;

    return (
      <nav className={classname} id="site-nav">
        <Menu location="navbar" />
      </nav>
    );
  }
}

export default withSyncScroll(SiteNav, {
  container: "#site-content",
  element: "#site-nav",
  min_width: 920
});
