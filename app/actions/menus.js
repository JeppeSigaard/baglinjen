import { fetch } from "../modules/api";

export function fetchMenu(slug) {
  return (dispatch, getState) => {
    dispatch({ type: "FETCHING_MENU", data: { slug } });
    fetch("menu-locations/" + slug).then(resp => {
      dispatch({
        type: "FETCHED_MENU",
        data: {
          slug,
          items: resp
        }
      });
    });
  };
}
