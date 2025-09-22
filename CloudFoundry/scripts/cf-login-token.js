async function login() {
  const res = await bru.runRequest("Authorization");
  const token = res.data.access_token;
  bru.setVar(`cf_token`, token); 
}

module.exports = { login };