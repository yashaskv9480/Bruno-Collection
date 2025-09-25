const jose = require("node-jose");
require("dotenv").config({
  path: "/Users/venkay1/Desktop/Bruno Collection/SAP/.env",
});

async function decryptPayload(payload) {
  const region = bru.getEnvVar("region");
  const env = bru.getGlobalEnvVar("env");
  const privateKeyName = `${region}_${env}_credstore_privateKey`;
  const privateKey = process.env[privateKeyName];

  const key = await jose.JWK.asKey(
    `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`,
    "pem",
    { alg: "RSA-OAEP-256", enc: "A256GCM" }
  );
  const decrypt = await jose.JWE.createDecrypt(key).decrypt(payload);

  const decryptedText = decrypt.plaintext.toString();

  const jsonData = JSON.parse(decryptedText);

  const value = jsonData.value;

  const originalText = JSON.parse(
    Buffer.from(value, "base64").toString("utf-8")
  );

  console.log(originalText);
}

module.exports = { decryptPayload };
