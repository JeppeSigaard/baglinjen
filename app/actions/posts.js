import { fetch } from "../modules/api";

export function fetchPost(link) {
  return (dispatch, getState) => {
    dispatch({ type: "FETCHING_POST", data: { link } });
    fetch(`by_url/${link}`).then(data => {
      if (data.link === link) {
        dispatch({ type: "FETCHED_POST", data: data });
      } else {
        dispatch({ type: "FETCHED_POST_FAILED", data: link });
      }
    });
  };
}

export function fetchPosts(args) {
  return (dispatch, getState) => {
    dispatch({ type: "FETCHING_POSTS", data: args });
    fetch("posts", args).then(data => {
      dispatch({ type: "FETCHED_POSTS", data });
    });
  };
}

export function fetchPages(args) {
  return (dispatch, getState) => {
    dispatch({ type: "FETCHING_POSTS", data: args });
    fetch("pages", args).then(data => {
      dispatch({ type: "FETCHED_POSTS", data });
    });
  };
}
