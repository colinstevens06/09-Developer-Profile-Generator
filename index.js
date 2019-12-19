// const sys = require("sys");
// const util = require("util");
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
const testHTML = fs.readFileSync("./hide/template.html", "utf8");
const options = { format: "letter", base: "css: ./hide/template.css" };

pdf.create(testHTML, options).toFile("./test.pdf", function(err, res) {
   if (err) return console.log(err);
   console.log(res);
});

let queryURL = "";
let gitURL = "";
let backgroundHex = "";
let avatarURL = "";
let gitName = "";
let gitLocation = "";
let gitBlog = "";
let gitBio = "";
let gitRepositories, gitFollowers, gitStars, gitUsersFollowing;

// axios.get("https://api.github.com/users/colinstevens06").then(function(res) {
//    // console.log(res.data);
//    // console.log(res.data.login);
// });

// inquirer
//    .prompt([
//       {
//          type: "list",
//          message: "What is your favorite color?",
//          choices: ["Purple", "Blue", "Green", "Yellow", "Orange", "Red"],
//          name: "background"
//       },
//       {
//          type: "input",
//          message: "What is your GitHub username?",
//          name: "username"
//       }
//    ])
//    .then(function(response) {
//       let backgroundColor = response.background;
//       let gitHubUsername = response.username;
//       queryURL = "https://api.github.com/users/" + gitHubUsername;
//       gitURL = "https://www.github.com/" + gitHubUsername;

//       switch (backgroundColor) {
//          case "Purple":
//             backgroundHex = "#9933ff";
//             break;
//          case "Blue":
//             backgroundHex = "#0099ff";
//             break;
//          case "Green":
//             backgroundHex = "#00cc66";
//             break;
//          case "Yellow":
//             backgroundHex = "#ffff66";
//             break;
//          case "Orange":
//             backgroundHex = "#ff9933";
//             break;
//          default:
//             backgroundHex = "#ff0066";
//       }

//       axios.get(queryURL).then(function(info) {
//          let gitHub = info.data;

//          // console.log(gitHub);

//          avatarURL = gitHub.avatar_url;
//          gitName = gitHub.name;
//          gitLocation = gitHub.location;
//          gitBlog = gitHub.blog;
//          gitBio = gitHub.bio;
//          gitRepositories = gitHub.public_repos;
//          gitFollowers = gitHub.followers;
//          gitUsersFollowing = gitHub.following;
//       });
//    });
