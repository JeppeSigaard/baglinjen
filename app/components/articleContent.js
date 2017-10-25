import React, { Component } from "react";
import { connect } from "react-redux";
import PostList from "./postList";
import Heading2 from "../contentBlocks/h2";
import Heading3 from "../contentBlocks/h3";
import Heading4 from "../contentBlocks/h4";
import Paragraph from "../contentBlocks/p";
import LinkBox from "../contentBlocks/links";
import Image from "../contentBlocks/image";
import Gallery from "../contentBlocks/gallery";

class ArticleContent extends Component {
  render() {
    const post = this.props.post;
    const rdy = post !== undefined && post.fetched !== false;

    return (
      <section className="article-content">
        {rdy &&
          post.content_blocks.map((block, i) => {
            switch (block.type) {
              case "h2":
                return <Heading2 key={i} index={i} content={block.content} />;
                break;
              case "h3":
                return <Heading3 key={i} index={i} content={block.content} />;
                break;
              case "h4":
                return <Heading4 key={i} index={i} content={block.content} />;
                break;
              case "paragraph":
                return <Paragraph key={i} index={i} content={block.content} />;
                break;
              case "image":
                return <Image key={i} index={i} image={block.image} />;
                break;
              case "link_box":
                return (
                  <LinkBox
                    key={i}
                    index={i}
                    links={block.links}
                    color={this.props.color}
                  />
                );
                break;
              case "gallery":
                return (
                  <Gallery
                    key={i}
                    index={i}
                    block={block}
                    color={this.props.color}
                  />
                );
                break;
            }
          })}
        {rdy && post.posts !== undefined && <PostList list={post.posts} />}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { color: state.color };
};

export default connect(mapStateToProps)(ArticleContent);
