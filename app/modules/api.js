const wp = { ...wp_settings };

export function fetch(edge = null, properties = null) {
  if (edge === null) return;

  return new Promise((resolve, reject) => {
    let c = 0,
      query = "";

    // Sets get params using properties
    if (properties !== null) {
      for (let k in properties) {
        c++;
        query += c > 1 ? "&" : "?";
        if (properties.hasOwnProperty(k)) {
          const key = encodeURIComponent(k),
            val = encodeURIComponent(properties[k]);
          query += `${key}=${val}`;
        }
      }
    }

    // Opens new request
    let request = new XMLHttpRequest();
    request.addEventListener("load", data => {
      resolve(JSON.parse(data.target.response));
    });

    // Sends request
    request.open("GET", `${wp.api}wp/v2/${edge}${query}`);
    request.send();
  });
}
