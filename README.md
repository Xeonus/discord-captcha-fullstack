# Discord invite captcha full-stack app for react
This application aims to fight discord bot spam attacks by:
- having the user to solve a Google Captcha
- generating a single-use invite that expires after a certain duration 

You can check out the final product at https://discord.balancer.fi

This project is directly inspired by the Iota-Ledger discord implementation using Python Flasks: [Iota Captcha Solver](https://github.com/iotaledger/discord-invite-captcha).

## Requirements
- React
- Node.js
- Discord API

## How to install locally

- Pull repo
- Follow the configuration guide
- Execute 
- To run locally, open 2 consoles and execute code below:

Terminal 1:
```
//Install node (from root)
npm install
npm start
```

Terminal 2:

```
//Install client
cd client
npm install
npm start
```

You should now see an instance on https://localhost:3000
with node serving at port 4000.


## Configuration guide
Following steps need to be followed if you want to set up the discord invite site yourself:

### Step 1: Configure your discord bot
You first need to create a discord application at the Discord developer portal: https://discord.com/developers/
1. Create a new application
2. Create a bot
3. Create an invite link with "Create Instant Invite" (=1) privileges. A link will look something like this: https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=1&scope=bot
4. Add the bot to your site. It will stay offline as it will not interact with users but is rather used to generate invites.
5. Obtain the secret key (do not share it with anyone!) and store it in the .env file

### Step 2: Configure Google Captcha
As a next step you need to set up a captcha service - in this implementation we use GoogleCaptchas as they are well supported in React libraries.
1. Set up an account at https://www.google.com/recaptcha/
2. Register a new Captcha Instance of v2 Tickbox
3. Add the domains you want to use for the final product (tip: for testing add localhost to the whitelist but remove it afterwards)
4. Adjust the other settings to your liking and needs
5. Store the public and private key in the .env file

### Step 3: Adjusting the template
The following implementation can be checked out at https://discord.balancer.fi

If you want another look-and-feel, please adjust the react components in the client folder accordingly to your branding-needs.

## Deployment with Heroku
package.json files are set up that they work for automatic buiolds with popular hosting service Heroku. I highly recommend you deploy there - it's free.
Heroku deployment steps:
```
//Set up a heroku account then execute
sudo npm i -g heroku
heroku login
git init
heroku git:remote -a insert-your-app-name-here
git add .
git commit -am "Deploy app to Heroku"
git push heroku master
```

Congratulations! You deployed your own instance of the invite bot on Heroku