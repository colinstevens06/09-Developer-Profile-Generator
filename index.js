const sys = require("sys");
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

axios.get("https://api.github.com/users/colinstevens06").then(function(res) {
   // console.log(res.data);
   console.log(res.data.login);
});

// // * Profile image
// // * User name
// // * Links to the following:
// //   * User location via Google Maps
// //   * User GitHub profile
// //   * User blog
// // * User bio
// // * Number of public repositories
// // * Number of followers
// // * Number of GitHub stars
// // * Number of users following

inquirer
   .prompt([
      {
         type: "list",
         message: "What is your favorite color?",
         choices: ["Purple", "Blue", "Green", "Yellow", "Orange", "Red"],
         name: "background"
      },
      {
         type: "input",
         message: "What is your GitHub username?",
         name: "username"
      }
   ])
   .then(function(response) {
      let backgroundColor = response.background;
      let gitHubUsername = response.username;
      let backgroundHex = "";

      switch (backgroundColor) {
         case "purple":
            backgroundHex = "#9933ff";
            break;
         case "blue":
            backgroundHex = "#0099ff";
            break;
         case "green":
            backgroundHex = "#00cc66";
            break;
         case "yellow":
            backgroundHex = "#ffff66";
            break;
         case "orange":
            backgroundHex = "#ff9933";
            break;
         default:
            backgroundHex = "#ff0066";
      }

      console.log(backgroundHex);
   });
