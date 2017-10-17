import React, { Component } from "react";

import SiteNav from "../components/siteNav";
import SiteContent from "../components/siteContent";
import ContentSection from "../components/contentSection";
import ContentHeader from "../components/contentHeader";
import ContentMain from "../components/contentMain";
import ContentAside from "../components/contentAside";

export default class ArchiveTemplate extends Component {
  render() {
    const post = this.props.post;
    return (
      <SiteContent>
        <SiteNav />
        <ContentHeader post={post} />
        <ContentSection>
          <ContentMain post={post} />
          <ContentAside />
        </ContentSection>
      </SiteContent>
    );
  }
}
