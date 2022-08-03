const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
function generateRoomID() {
    return String(Math.floor(Math.random() * 110000000000000));
}
admin.initializeApp({
  credential: admin.credential.cert(
    {
        "type": "service_account",
        "project_id": "pychatro",
        "private_key_id": "1038e08c08bea53d846c34505523bb72c62a2e6a",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+/dIXBPB/79D/\nRM62YLhICUiPNWWc/T8gV1DPJLbFPFVAq/5aUV6pOLhvsUDmv0YCOAoYQ0uoKAiS\nrZSTtyQg6PNAt1l2kIDBfsX4oqEr9qBnXkdW9MiXv/1vY2touc1dKNIwmXetBO/H\nEnF4++kjOfz6GIioF1znyz9ijujFASFQ2M3yUDmXJGjYjNYQPCY9dKMG6zRTkkPs\nlzl1jFnLPoxuCs1nQHPOc37zceGZpUE6EVn/22CjoP81pDwH/B2Qtew0TRc7EZUb\nJxKyFaIizWU8HmJ5APWv9FwEeIPxcmNLcUeoY5wBW5ZDU8jfG76Uci8dWoyjNWJK\nxx/JnUxNAgMBAAECggEACkUTuvElDXwTvOYyR1REFHuLT0gLwrlLX63SRpEu0sQ/\nwU5+StT9RhQqtrbNSpsWZKAmys8zjkM40spKpva+FpbwHZa+VMXIZp8ufgQgroCA\nd452P5LCBoboVcj+yY7UICJFyx81dDRDwGyZdWv2SVKg68HN91vqPvyK1/3fPliN\na9hw0BKad/xgjUI6v73nBAz3oKYL38t24jZEGJfMV8gI1oOr2VAgbpKtZmg30BQt\nVduWFBcXfqyA03u7KG7n9//4rl/0rm9+17Z66FPA7mLLDIwUdMv/t5u00O7u9GI1\nilw40gfhy4/eupuPPCuDmgNjz0FhtDEuVTYzt4KVcQKBgQDjksyRBZ/LpeKeRaS/\nc0VknXn0fF8x2n8qInEG4FfV7hRukWl3HkRBXesjaxc7XFAyfbcJLniHkanKhgoA\nJUI2YiM4mGYW71eyObnm7fWRYmfl6Q8n57/znM5ls49owqAHjx4Kn5o7doevhAh6\nmPATRFDQjOjohAR7Ns5HoddRXwKBgQDW2ToaBI8ebSCgUjIvdbA8Zd1bUXjLIRPH\nJLnvQF0gzpuwIOEXvTft9RnwhVStMSDw8uooKQ5R0p6dlf216rZjDEoB5RT7LqfH\nCuIVempculB4sGYJ+h6utQroUmG0Xhn91llmbGd29Q8DVaXVH1Lp95O5nSSRaRQ+\nE+7lsC2l0wKBgBuIcjmFfazM2Bsf/+utzZJ7vvqGZZoJfmMhoZ0cXWQjltM9wo3H\n2qgx7bXuSfRDmexR62gv+CMmy20WRHV6DIW539sEDS3vLSQB+eznk1NQnZNiXBQO\n5NlbelkxnUMmcOgZN6A/aRCSqZ3hkokKodki5cgllDQ1bLlfixt9iChvAoGAd1vd\nPIEV5ahovMiNWvJ+Az/wNwBPJEJvE26i4XkXg9dkhPfvNVoIzWkijQ31mfY2P8Yk\nMkWE0A470n52oe8QfnxgTScwfc9QpHK2YYpNttBHTpVpSteq3hJ0Sdcisqqos+22\nYwGMhXjla0vUwk8RqCvD5RWZMDN5bHd0fCRhZ8MCgYAfwW7OwCP1ry6PZQHRBVH6\nQlOE2luPrnj/2kGXw+kWTsLZy6sF6imgfNW8bOdzYf4jufq3ktu2B2aZ8OSLccVV\nvVehZ9T/TL8rlWmza7nxXbCP2JLntg6MLH5GSiNMADPtvG3cQL1ZeyCmlXY11nVj\nEHV+dt//QOZgvTl69+bRPA==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-yanj0@pychatro.iam.gserviceaccount.com",
        "client_id": "110332320642851640239",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yanj0%40pychatro.iam.gserviceaccount.com"
      }
  )
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//const requestData = req.body;
app.get('/', (req,res) => {
    res.sendFile('index.html', { root: __dirname });
});
app.get('/newRoom', (req,res) => {
    res.sendFile('2.html', { root: __dirname });
});
app.post('/createRoom', (req,res) => {
    const bodyContent = req.body;
    const userName = bodyContent.userName + generateRoomID();
    const roomPassword = bodyContent.roomPassword;
    const roomID = generateRoomID();
    const db = getFirestore();
    const data = {
      [userName]:"I have successfully created this chat room!"
    };
    const adata = {
        userName:bodyContent.userName,
        password:roomPassword,
    }
    db.collection('rooms').doc(roomID).set(data);
    db.collection('rooms').doc(roomID).collection('auth').doc('password').set(adata);
    res.send("Success!")
});
app.listen(80, ()=> {
    console.log("PyChatRo: Server started!")
});
