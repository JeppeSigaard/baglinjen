import React from "react";

import Youtube from "../componentParts/youtube";

export default class ContentHeader extends React.Component {
  render() {
    const post = this.props.post;

    let title = "",
      background = "";

    if (post !== undefined && post.fetched !== false) {
      title = post.title.rendered;

      if (post.featured_image !== null) {
        background =
          post.featured_image.media_details.sizes != null
            ? post.featured_image.media_details.sizes.widescreen.source_url
            : "";
      }
    }

    return (
      <header className="content-header" id="content-header">
        <Youtube parent={post.id} />
      </header>
    );
  }
}
