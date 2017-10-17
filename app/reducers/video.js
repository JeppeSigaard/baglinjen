const initialState = {
  status: -1,
  videoId: null,
  visualState: "hidden",
  intent: "pause",
  parent: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_VIDEO_ID":
      if (action.data.id === undefined) return state;
      return { ...state, videoId: action.data.id, parent: action.data.parent };
      break;
    case "SET_VIDEO_VISUAL_STATE":
      if (action.data.visualState === undefined) return state;
      return { ...state, visualState: action.data.visualState };
      break;
    case "SET_VIDEO_STATUS":
      if (action.data.status === undefined) return state;
      return { ...state, status: action.data.status };
      break;
    case "SET_VIDEO_INTENT":
      if (action.data.intent === undefined) return state;
      return { ...state, intent: action.data.intent };
      break;
  }
  return state;
}
