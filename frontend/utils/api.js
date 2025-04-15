export const fetchData = async (
  url,
  method = "GET",
  body = null,
  setter,
  isJson = true
) => {
  try {
    const options = {
      method,
    };

    if (method !== "GET") {
      options.headers = {
        "Content-Type": "application/json",
      };
      if (body) {
        options.body = JSON.stringify(body);
      }
    }

    const response = await fetch(url, options);
    const data = isJson ? await response.json() : await response.text();
    setter(data);
  } catch (error) {
    console.error(`Error in fetching data from ${url}:`, error);
  }
};

export const fetchOptions = (url, setter, key) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setter(data[key] || []); // Use the key to dynamically set the state
    })
    .catch((err) => {
      console.error(`Failed to fetch from ${url}:`, err);
    });
};
