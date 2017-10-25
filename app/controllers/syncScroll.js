import React from "react";

export default function withSyncScroll(
  WrappedComponent,
  options = {
    container: null,
    element: null,
    min_width: null
  }
) {
  return class Scroll extends React.Component {
    constructor(props) {
      super(props);
      this.active = true;
      this.elems = {};
      this.state = {
        position: "over",
        top: 0,
        lastTop: 0
      };
    }

    onScroll() {
      if (options.min_width !== null && window.innerWidth < options.min_width)
        return;
      requestAnimationFrame(this.handleScroll.bind(this));
    }

    handleScroll() {
      // prepare consts
      const doc = document.documentElement,
        top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
        lastTop = this.state.top,
        winHeight = window.innerHeight,
        conTop = this.elems.c.getBoundingClientRect().top,
        conHeight = this.elems.c.offsetHeight;

      // Set position
      let position;
      if (conTop > winHeight) {
        position = "above";
      } else if (conTop > 0) {
        position = "over";
      } else if (conTop + conHeight < 0) {
        position = "below";
      } else if (conTop + conHeight - winHeight < 0) {
        position = "under";
      } else {
        position = "in";
      }

      // Set state
      if (this.active) this.setState({ position, top, lastTop });

      // Set scrollTop
      if (this.elems.e === null) return;
      const inScroll = this.elems.e.scrollTop + top - lastTop;
      switch (position) {
        case "over":
          this.elems.e.scrollTop = 0;
          break;
        case "in":
          this.elems.e.scrollTop = inScroll;
          break;
        case "under":
          this.elems.e.scrollTop = 100000000000000;
          break;
      }
    }

    componentDidMount() {
      // ignore if container not set
      if (options.container === null) return;
      this.active = true;

      // get elements
      this.elems = {
        c: document.querySelector(options.container),
        e: options.element ? document.querySelector(options.element) : null
      };

      // Add event listeners
      const onscroll = this.onScroll.bind(this);
      window.addEventListener("scroll", onscroll, this);
      window.addEventListener("resize", onscroll, this);
    }

    componentWillUnmount() {
      this.active = false;
      const onscroll = this.onScroll.bind(this);
      window.removeEventListener("scroll", onscroll, this);
      window.removeEventListener("resize", onscroll, this);
    }

    render() {
      const scroll = options.container !== null ? this.state : null;
      return <WrappedComponent scroll={scroll} {...this.props} />;
    }
  };
}
