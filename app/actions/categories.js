import { fetch } from "../modules/api";

export function fetchCategories(args) {
  return (dispatch, getState) => {
    dispatch({ type: "FETCHING_CATEGORIES", data: args });
    fetch("categories", args).then(data => {
      dispatch({ type: "FETCHED_CATEGORIES", data });
      data.map((cat, i) => {
        const data = cat.posts.map(post => {
          post.fetched = true;
          return post;
        });
        dispatch({ type: "FETCHED_POSTS", data: cat.posts });
      });
    });
  };
}

export function fetchCategory(id, args) {
  return (dispatch, getState) => {
    dispatch({ type: "FETCHING_CATEGORY", id: id });
    fetch("categories/" + id, args).then(data => {
      dispatch({ type: "FETCHED_CATEGORY", data });
      const posts = data.posts.map(post => {
        post.fetched = true;
        return post;
      });
      dispatch({ type: "FETCHED_POSTS", data: posts });
    });
  };
}
