//Dependencies
const path = require('path');
const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require('body-parser').json();
const fetch = require("isomorphic-fetch");


const PORT = process.env.PORT || 4000;
const app = express();
// Serve react app
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
 
//Call post on form submit
app.post("/submit", bodyParser, (req, res) => {
  const name = req.body.name;
  // getting site key from client side
  const response_key = req.body["token"];
  const secret_key = process.env.CAPTCHA_SECRET_KEY;
  const url =
`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
 
  //POST request to verify captcha
  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => {
      if (google_response.success == true) {
        return res.send({ response: "Successful" });
      } else {
        return res.send({ response: "Failed" });
      }
    })
    .catch((error) => {
      return res.json({ error });
    });
});

//Discord API endpoint
app.post("/discord", bodyParser, (req, res) => {
  const expires = req.body.expires
  const settings = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bot ' + process.env.DISCORD_BOT_PRIV_KEY,
    },
    body: JSON.stringify({
        'max_uses': 1,
        'unique': true,
        'expires': expires,
    })
};
fetch("https://discord.com/api/v6/channels/"+ process.env.CHANNEL_ID + "/invites", settings)
.then((resp) => resp.json())
.then((discord_response) => {
  //Sending entire discord response body
res.send(discord_response)
})
});
 
// Lifting the app on port 4000.
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));