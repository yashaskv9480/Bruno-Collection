async function login() {
  try {
    const res = await bru.runRequest("Authorization - Client Credentials");
    const token = res.data.access_token;
    bru.setVar(`access_token`, token);
  } catch (err) {
    console.error("Error running request:", err);
  }
}

module.exports = { login };
