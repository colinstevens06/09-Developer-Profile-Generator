const sys = require("sys");
const util = require("util");
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const PDFDocument = require("pdfkit");

const pdf = new PDFDocument();

let queryURL = "";
let gitURL = "";
let backgroundHex = "";
let profileImage = "";
let gitName = "";
let gitLocation = "";
let gitBlog = "";
let gitBio = "";
let gitRepositories, gitFollowers, gitStars, gitUsersFollowing;

axios.get("https://api.github.com/users/colinstevens06").then(function(res) {
   // console.log(res.data);
   console.log(res.data.login);
});

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
      queryURL = "https://api.github.com/users/" + gitHubUsername;
      gitURL = "https://www.github.com/" + gitHubUsername;

      switch (backgroundColor) {
         case "Purple":
            backgroundHex = "#9933ff";
            break;
         case "Blue":
            backgroundHex = "#0099ff";
            break;
         case "Green":
            backgroundHex = "#00cc66";
            break;
         case "Yellow":
            backgroundHex = "#ffff66";
            break;
         case "Orange":
            backgroundHex = "#ff9933";
            break;
         default:
            backgroundHex = "#ff0066";
      }

      axios.get(queryURL).then(function(info) {
         let gitHub = info.data;
         // console.log(gitHub);

         profileImage = gitHub.avatar_url;
         gitName = gitHub.name;
         gitLocation = gitHub.location;
         gitBlog = gitHub.blog;
         gitBio = gitHub.bio;
         gitRepositories = gitHub.public_repos;
         gitFollowers = gitHub.followers;
         gitUsersFollowing = gitHub.following;

         // console.log(gitUsersFollowing);
         // console.log(backgroundHex.toString());
         // console.log(backgroundColor);

         pdf.pipe(fs.createWriteStream("./" + gitHubUsername + ".pdf"));
         // pdf.image(profileImage, 5, 5, { width: 200 });

         pdf.rect(0, 10, 650, 100)
            .lineWidth(3)
            .fillOpacity(0.2)
            .fill(backgroundHex);

         pdf.fontSize(25)
            .fillOpacity(1)
            .fill("block")
            .fillColor("black")
            .text(gitName, 100, 40, { align: "center" });

         pdf.rect(10, 150, 250, 75)
            .fillOpacity(0.2)
            .fill(backgroundHex);

         pdf.fontSize(18)
            .fillOpacity(1)
            .fillColor("black")

            .fill("block")
            .text("Public Repositories: " + gitRepositories, 50, 175);

         pdf.rect(10, 250, 250, 75)
            .fillOpacity(0.2)
            .fill(backgroundHex);

         pdf.fontSize(18)
            .fillColor("black")

            .fillOpacity(1)
            .fill("block")
            .text("GitHub Stars: " + "?", 50, 250);

         pdf.rect(275, 150, 250, 75)
            .fillOpacity(0.2)
            .fill(backgroundHex);

         pdf.fontSize(18)
            .fillColor("black")

            .fillOpacity(1)
            .fill("block")
            .text("Followers: " + gitFollowers, 300, 175);

         pdf.rect(275, 250, 250, 75)
            .fillOpacity(0.2)
            .fill(backgroundHex);

         pdf.fontSize(18)
            .fillColor("black")
            .fillOpacity(1)
            .fill("block")
            .text("Following: " + gitUsersFollowing, 300, 250);

         pdf.end();
      });
   });
