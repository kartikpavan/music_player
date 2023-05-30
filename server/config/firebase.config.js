const admin = require("firebase-admin");

admin.initializeApp({
   credential: admin.credential.cert({
      type: "service_account",
      project_id: "music-player-a2627",
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY,
      client_email: "firebase-adminsdk-q247a@music-player-a2627.iam.gserviceaccount.com",
      client_id: "106820744259833346405",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
         "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-q247a%40music-player-a2627.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
   }),
});

module.exports = admin;
