async function fetchCsrfToken() {
  try {
    const res = await bru.runRequest("ANS - Get Csrf Token");

    const token = res.headers["x-csrf-token"];
    bru.setVar(`csrf_token`, token);
  } catch (err) {
    console.error("Error running request:", err);
  }
}

module.exports = { fetchCsrfToken };
