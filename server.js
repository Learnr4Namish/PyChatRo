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
    console.log(`PyChatRo: Requested Client IP address: ${req.ip}`);
    res.sendFile('index.html', { root: __dirname });
});
app.get('/newRoom', (req,res) => {
    console.log(`PyChatRo: Requested Client IP address: ${req.ip}`);
    res.sendFile('2.html', { root: __dirname });
});
app.post('/createRoom', (req,res) => {
    console.log(`PyChatRo: Requested Client IP address: ${req.ip}`);
    const bodyContent = req.body;
    const userName = bodyContent.userName + generateRoomID();
    const roomPassword = bodyContent.roomPassword;
    const roomID = generateRoomID();
    const db = getFirestore();
    console.log(`PyChatRo: Accepted the request to create a room from a person named ${bodyContent.userName}`);
    const data = {
      [userName]:"I have successfully created this chat room!"
    };
    const adata = {
        userName:bodyContent.userName,
        password:roomPassword,
    }
    db.collection('rooms').doc(roomID).set(data);
    db.collection('rooms').doc(roomID).collection('auth').doc('password').set(adata);
    res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <title>PyChatRo | Chat on the go with full Security (Made by Namish Kumar)</title>
</head>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Ubuntu&display=swap');
    .mainBtn {
        width: 10em; font-size:20px; padding: 10px; margin-left: 8px;
    }
    body {
        font-family: Arial, sans-serif;
        background-repeat:none;
        height: 100%;
        color: rgb(0, 0, 0);
    }
    html {
        height: 100%;
    }
</style>
<body>
    <nav class="navbar navbar-expand-lg" style="color: rgb(0, 0, 0);">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" style="font-size: 26.5px; color: rgb(0, 0, 0); font-weight: 500;">PyChatRo</a>
          <div class="navbar-toggler" style="border: none;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="material-symbols-outlined">
                menu
                </span>
            </div>
        </div>
      </nav>
     <div style="margin-left:8px; font-size:20px;">
     <p class="text-50">Successfully Created your chat-room. Please share the following details with the participants so that they can join.</p>
     <p class="text-50">Room ID: ${roomID}</p>
     <p class="text-50">Room Password: ${roomPassword}</p>
     <form method="post" action="/joinRoom">
     <input name="userRole" value="admin" hidden>
     <input name="roomID" value="${roomID}" hidden>
     <input name="roomPassword" value="${roomPassword}" hidden>
     <input name="userName" value=${bodyContent.userName}" hidden>
     <button type="submit" class="btn btn-primary mainBtn">Join my room</button>
</form>
     </div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
</body>
</html>
    `)
    console.log(`PyChatRo: Successfully created the room by person named ${bodyContent.userName} with the room id ${roomID}`);
});
app.listen(process.env.PORT || 3000, ()=> {
    console.log("PyChatRo: Server started!")
});
app.post('/joinRoom', (req,res) => {
    console.log(`PyChatRo: Requested Client IP address: ${req.ip}`);
    const bodyContent = req.body;
    const userRole = bodyContent.userRole;
    const roomID = bodyContent.roomID;
    const roomPassword = bodyContent.roomPassword;
    const userName = bodyContent.userName;
    const db = getFirestore();
    const roomRef = db.collection('rooms').doc(roomID).collection('auth').doc('password');
    const doc = roomRef.get();
    const doc2 = db.collection('rooms').doc(roomID).get();
    if (doc2.exists) {
        
        console.log(doc.data());
        const actualRoomPassword = doc.data().password;
        const passwordIsValid = roomPassword === actualRoomPassword;
        if(!passwordIsValid) {
          res.send (`
          <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
            <title>PyChatRo | Chat on the go with full Security (Made by Namish Kumar)</title>
        </head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Ubuntu&display=swap');
            .mainBtn {
                width: 10em; font-size:20px; padding: 10px; margin-left: 8px;
            }
            body {
                font-family: Arial, sans-serif;
                background-repeat:none;
                height: 100%;
                color: rgb(0, 0, 0);
            }
            html {
                height: 100%;
            }
        </style>
        <body>
            <nav class="navbar navbar-expand-lg" style="color: rgb(0, 0, 0);">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#" style="font-size: 26.5px; color: rgb(0, 0, 0); font-weight: 500;">PyChatRo</a>
                  <div class="navbar-toggler" style="border: none;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="material-symbols-outlined">
                        menu
                        </span>
                    </div>
                </div>
              </nav>
             <div style="margin-left:8px; font-size:20px;">
             <p class="text-50">We are sorry but the password that you have entered for the room id ${roomID} is invalid. Please enter valid password for this chat-room.</p>
             <button type="button" class="btn btn-primary mainBtn" onclick="location.href = '/join'">Try Again</button>
        </form>
             </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
        </body>
        </html>
        `);
        }else{
          res.send (`
          <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
            <title>PyChatRo | Chat on the go with full Security (Made by Namish Kumar)</title>
        </head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Ubuntu&display=swap');
            .mainBtn {
                width: 10em; font-size:20px; padding: 10px; margin-left: 8px;
            }
            body {
                font-family: Arial, sans-serif;
                background-repeat:none;
                height: 100%;
                color: rgb(0, 0, 0);
            }
            html {
                height: 100%;
            }
        </style>
        <body>
            <nav class="navbar navbar-expand-lg" style="color: rgb(0, 0, 0);">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#" style="font-size: 26.5px; color: rgb(0, 0, 0); font-weight: 500;">PyChatRo</a>
                  <div class="navbar-toggler" style="border: none;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="material-symbols-outlined">
                        menu
                        </span>
                    </div>
                </div>
              </nav>
             <div style="margin-left:8px; font-size:20px;">
             <p class="text-50">Welcome to this chat room ${userName}! Please click on the button below to enter the chat room.</p>
             <form method="post" action="/chat">
             <input name="userRole" value=${userRole} hidden>
       <input name="roomID" value="${roomID}" hidden>
       <input name="roomPassword" value="${roomPassword}" hidden>
       <input name="userName" value=${userName}" hidden>
        </form>
             </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
        </body>
        </html>
        `);
        }
    } else {
      console.log(`PyChatRo: No such Chat Room called ${roomID}`);
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
          <title>PyChatRo | Chat on the go with full Security (Made by Namish Kumar)</title>
      </head>
      <style>
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Ubuntu&display=swap');
          .mainBtn {
              width: 10em; font-size:20px; padding: 10px; margin-left: 8px;
          }
          body {
              font-family: Arial, sans-serif;
              background-repeat:none;
              height: 100%;
              color: rgb(0, 0, 0);
          }
          html {
              height: 100%;
          }
      </style>
      <body>
          <nav class="navbar navbar-expand-lg" style="color: rgb(0, 0, 0);">
              <div class="container-fluid">
                <a class="navbar-brand" href="#" style="font-size: 26.5px; color: rgb(0, 0, 0); font-weight: 500;">PyChatRo</a>
                <div class="navbar-toggler" style="border: none;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="material-symbols-outlined">
                      menu
                      </span>
                  </div>
              </div>
            </nav>
           <div style="margin-left:8px; font-size:20px;">
           <p class="text-50">We are sorry but the room id ${roomID} is not a valid PyChatRo chat-room. It may have been expired or deleted by the admin. Consider creating a chat room if you want to.</p>
           <button type="button" class="btn btn-primary mainBtn" onclick="location.href = '/newRoom'">Create my chat room</button>
      </form>
           </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
      </body>
      </html>
      `);
    }
});
app.get('/join', (req,res) => {
    console.log(`PyChatRo: Requested Client IP address: ${req.ip}`);
    res.sendFile('3.html', { root: __dirname });
});
app.post('/chat', (req,res) => {
    console.log(`PyChatRo: Requested Client IP address: ${req.ip}`);
    const bodyContent = req.body;
    const userRole = bodyContent.userRole;
    const roomID = bodyContent.roomID;
    const roomPassword = bodyContent.roomPassword;
    const userName = bodyContent.userName;
    if(userRole === "admin") {
        res.send(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
            <title>PyChatRo | Chat on the go with full Security (Made by Namish Kumar)</title>
        </head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Ubuntu&display=swap');
            .mainBtn {
                width: 10em; font-size:20px; padding: 10px; margin-left: 8px;
            }
            body {
                font-family: Arial, sans-serif;
                background-repeat:none;
                height: 100%;
                color: rgb(0, 0, 0);
            }
            html {
                height: 100%;
            }
        </style>
        <body>
            <nav class="navbar navbar-expand-lg" style="color: rgb(0, 0, 0);">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#" style="font-size: 26.5px; color: rgb(0, 0, 0); font-weight: 500;">PyChatRo</a>
                  <div class="navbar-toggler" style="border: none;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="material-symbols-outlined">
                        menu
                        </span>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
</div>
                </div>
              </nav>
             <div style="margin-left:8px; font-size:20px;">
             <div id="chatsContainer">

             </div>
             </div>
             <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.0.0-alpha.1/axios.min.js" integrity="sha512-xIPqqrfvUAc/Cspuj7Bq0UtHNo/5qkdyngx6Vwt+tmbvTLDszzXM0G6c91LXmGrRx8KEPulT+AfOOez+TeVylg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
             <script>
             axios.post('/readMessages', {
                roomID: ${roomID},
                roomPassword: ${roomPassword}
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
             </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
        </body>
        </html>`
        );
    }
});
app.post('/delete', (req,res) => {
   
});
app.post('/readMessages', (req,res) => {
   
});
