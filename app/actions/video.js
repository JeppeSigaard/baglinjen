const parseLink = url => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[7].length === 11) {
    return match[7];
  } else return url;
};

export function setVideoState(playState) {
  return {
    type: "SET_VIDEO_STATUS",
    data: { status: playState }
  };
}

export function changeVideo(id = false, parent = false) {
  return (dispatch, getState) => {
    if (!id || !parent) return;
    const state = getState(),
      parsedId = parseLink(id);

    if (parsedId !== state.video.videoId) {
      dispatch({ type: "SET_VIDEO_ID", data: { id: parsedId, parent } });
    }
  };
}

export function playVideo(id = null, parent = null) {
  return (dispatch, getState) => {
    if (id !== null) {
      const state = getState(),
        parsedId = parseLink(id);

      if (parsedId !== state.video.videoId) {
        dispatch({ type: "SET_VIDEO_ID", data: { id: parsedId, parent } });
      }
    }

    dispatch({ type: "SET_VIDEO_INTENT", data: { intent: "play" } });
  };
}

export function pauseVideo(id = null, parent = null) {
  return (dispatch, getState) => {
    if (id !== null) {
      const state = getState(),
        parsedId = parseLink(id);

      if (parsedId !== state.video.videoId) {
        dispatch({ type: "SET_VIDEO_ID", data: { id: parsedId, parent } });
      }
    }

    dispatch({ type: "SET_VIDEO_INTENT", data: { intent: "pause" } });
  };
}

export function changeVideoPosition(position = "hidden") {
  return {
    type: "SET_VIDEO_VISUAL_STATE",
    data: { visualState: position }
  };
}

export function destroyVideo() {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_VIDEO_VISUAL_STATE",
      data: { visualState: "hidden" }
    });
    dispatch({ type: "SET_VIDEO_INTENT", data: { intent: "stop" } });
  };
}
