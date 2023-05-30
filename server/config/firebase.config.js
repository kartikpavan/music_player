const admin = require("firebase-admin");

admin.initializeApp({
   credential: admin.credential.cert({
      type: "service_account",
      project_id: "music-player-a2627",
      private_key_id: "f29307faeee4dcc6565ac7ea2c8f3c135821204f",
      private_key:
         "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8G2bU/rABWoGs\nxabC1gX6JDvOVq4bMcbsoLKCTEYEMMZfHeWJ8ctBu8TdGCohyqKl7F5sEg6JrMMq\n0KSFrfxa5y3HGLE2rSaTWWPh+CetEGg5pLYkvmG39peE5pbedU8EOGrLtT6fRRhC\n/H1LWaY07O07ylTYHRqE5+dothgk26yFexGuxM5YXqwMq1HS3a19vtRM8XGQKUz+\ndY4+lMNQmmiQmkJTcc9HVwNHN9msmLdY3MsteSREbbDH4VKdM7Wp4a0y8hr4En40\nA1yJvvbRXPA+/StkZZYlpf4IF915vAi12uCHjVedJhMf8Y9OvdbfskhgllODbuyW\nrBFIo38BAgMBAAECggEAUtFlpuUzLIVijmS/FQ0RuJ33TtNO+F4kDM57iW53bSTk\nUcBh7Sftq1U2SXl4I0SJ869rqv0QNYFAtDsEFG8TqhoaR4wRidcWIs26ciTFoyaU\nHLzuDKNddpc1AqhbSDoxvdPxARsdJRZQpj1wFJq12Jtvn2FnlXbK1DUd5zY0zxS/\nK89hip/ypM3mxH6jC86GXFirlMHw4ekLzCepNCRvuGY88hZlsOPocm3rVn56dqRv\nlGxhpiDLEK/t7fHOtkNz/1pZ+tzUdVWOj3n4b4aWDvsZhH85VTdvZ+MpQsLKrgsl\nA3APrykYWDKknKCPK135vXH1u1cXwH2+DLLgWPou2QKBgQDkzYZUehP76Eg7aCNV\nJGGAmhS3hH0JKum+iIgnVss9vYbTXEf/eaks8U9JK8DU0cbgVsJAtSblsExqbCag\n19zZoIE+2OCk88Oi9bgLV8hpAZFPY8eTEwJPxnAhM2q004EvP8X4CmVZI9yXda0W\n1oDDAmTAnz3CQGDu+2dbFht1XwKBgQDSd4DI1BOPFzxvTu/eEYDSqyOcFlJlD5QT\nf5FCrEHv7XwxSDyLOBluRUs6qZ4npEzzBOhb2cUqP39i3/azVO0nNoP/OZasz3b6\nSXx87A700okZik450xNZHbpnZffMEZ8Gi31gu4n7zPYcuIGDdEV6ihDnlPEgAJ+r\nEqm4zqAHnwKBgQCldkPon4gIKkjiPUMf9XlVaRgGRxetI416Ln5YBJpiAceY3ilr\nBW5kg/XUcoG25iWuYs+Dv/1rKX15kNC2jKS39SzCaFC8uVQHay83dLoHxgxxnzTa\nlWqcimLYf7hxIGtR4gqmf84fEqIaHg2YcHMZk4eNDRu6eJgg+0oZQvmEfQKBgAeX\nf/G+lKYItIlfU4+zGe5/dd1fgMFcen7pjxfUltxMuLoeXPC4qVIs9bW8AJR1fMEX\nYDpP9Ki9eZ7bbU6ytYtAkCpYrXK2WRhWJkNrUG7MWV2ue3vifUQtqleoefPGfvIB\nfhhLK4MFtar7jNBtFUSCTnHMEZaR7zCAj9a2vVcJAoGBANPjz3Wc2MRDGEwJbSaH\nwFz1X38UdVwqdzFh9ksBtHJFBHGqFDCql8mykS441alB3GxapPCzZAA0E5xk976N\nvesd26S74xUzTduIky7Z2ZfrFdvs+jP/fsMWYAIJ1QQzk+jfLRiOYuhee7qqkvUS\nEjz+BRhKNmFSLJpCOdQmvT3h\n-----END PRIVATE KEY-----\n",
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
