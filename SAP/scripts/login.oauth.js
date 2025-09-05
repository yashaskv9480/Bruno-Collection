const axios = require("axios");

async function login(serviceName) {
  const region = bru.getEnvVar("region");
  const authenticator = bru.getEnvVar("authenticator");
  const env = bru.getGlobalEnvVar("env");

  const url = `https://${authenticator}.authentication.${region}.hana.ondemand.com/oauth/token`;

  const clientIdKey = `${serviceName}_client_id_${env}`;
  const clientSecretKey = `${serviceName}_client_secret_${env}`;

  const clientId = bru.getEnvVar(clientIdKey);
  const clientSecret = bru.getEnvVar(clientSecretKey);

  console.log("=== Login Info ===");
  console.log("URL:", url);
  console.log("Client ID Key:", clientIdKey);
  console.log("Client Secret Key:", clientSecretKey);
  console.log("Client ID:", clientId);
  console.log("Client Secret:", clientSecret);

  const body = `grant_type=client_credentials&client_id=${encodeURIComponent(
    clientId
  )}&client_secret=${encodeURIComponent(clientSecret)}`;

  try {
    const res = await axios({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: body,
    });

    console.log("Response Body:", res.data);

    const accessToken = res.data.access_token;
    bru.setVar(`${serviceName}_accessToken`, accessToken);

    return accessToken;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { login };
