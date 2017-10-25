export default function(state = [], action) {
  switch (action.type) {
    case "FETCHING_POSTS":
      return state;
      break;

    case "FETCHING_SPONSORS":
      return state;
      break;

    case "FETCHED_SPONSORS":
      const filtered_sponsors = action.data.filter(item => {
        if (state.find(post => post.id === item.id) !== undefined) return false;
        item.fetched = true;
        return true;
      });

      return state.concat(filtered_sponsors);
      break;

    case "FETCHED_POSTS":
      const filtered_posts = action.data.filter(item => {
        if (state.find(post => post.id === item.id) !== undefined) return false;
        item.fetched = true;
        return true;
      });

      return state.concat(filtered_posts);
      break;

    case "FETCHING_POST":
      // if already in state, ignore
      if (state.find(post => post.link == action.data.link) !== undefined)
        return state;

      return [...state, { fetched: false, link: action.data.link }];
      break;

    case "FETCHED_POST":
      if (action.data.type === "archive") {
        const posts = action.data.posts.map(post => {
          post.fetched = true;
          return post;
        });
        const newState = state.concat(
          posts.filter(
            item =>
              state.find(state_item => state_item.id === item.id) === undefined
          )
        );

        return newState.map(post => {
          if (
            post.link === action.data.link &&
            action.data.post !== undefined
          ) {
            action.data.post.fetched = true;
            action.data.post.posts = action.data.posts.map(post => post.id);

            return Object.assign({}, action.data.post);
          } else if (post.link === action.data.link) {
            action.data.fetched = true;
            action.data.posts = action.data.posts.map(post => post.id);

            return Object.assign({}, action.data);
          } else return post;
        });
      } else {
        return state.map(post => {
          if (post.link === action.data.link) {
            action.data.fetched = true;
            return Object.assign({}, action.data);
          } else return post;
        });
      }
      break;
  }
  return state;
}
