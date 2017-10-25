import React from "react";

export default function withMainSponsors(WrappedComponent) {
  return class MainSponsors extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const sponsors =
        this.props.posts !== undefined
          ? this.props.posts.filter(
              post =>
                post.fetched &&
                post.type === "sponsor" &&
                post.settings.featured === "1"
            )
          : undefined;

      return <WrappedComponent sponsors={sponsors} {...this.props} />;
    }
  };
}
