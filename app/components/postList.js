import React, { Component } from "react";
import { Link } from "react-router-dom";

class PostListItem extends Component {
  render() {
    return (
      <li>
        <Link to={this.props.url}>{this.props.title}</Link>
      </li>
    );
  }
}

class PostList extends Component {
  render() {
    if (this.props.list === undefined) return null;
    if (this.props.posts === undefined) return null;

    const listItems = this.props.list.map((id, i) => {
      const post = this.props.posts.find(item => item.id === id);

      if (post === undefined) return null;

      const relative_url = post.link.replace(this.props.wp.server, "");
      return (
        <PostListItem key={i} title={post.title.rendered} url={relative_url} />
      );
    });

    return (
      <div className="post-list">
        <ul>{listItems}</ul>
      </div>
    );
  }
}

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { posts: state.posts, wp: state.wp };
};

export default connect(mapStateToProps)(PostList);
