const bcrypt = require("bcrypt");
const fs = require("fs");
const { User, Event, Comment } = require('../models');
const sequelize = require('../config/connection');
const path = require("path");


(async () => {
  // Sync the models with the database
  await sequelize.sync({ force: true });

  // Load user and post data from JSON files

  const usersData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "userData.json"), "utf8")
  );
  const eventsData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "eventData.json"), "utf8")
  );
  const commentsData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "commentData.json"), "utf8")
  );

  // Seed users
  await User.bulkCreate(usersData);
  await Event.bulkCreate(eventsData);
  await Comment.bulkCreate(commentsData);

  console.log("Database seeded successfully!");
  process.exit(0);
})();

