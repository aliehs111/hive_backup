const router = require("express").Router();
const withAuth = require("../utils/auth");
const EventModel = require("../models/Event");
const UserModel = require("../models/User");
const CommentModel = require("../models/Comment");

// console.log(req.session.user_id)
router.get("/", withAuth, async function (req, res) {
  try {
    const eventsData = await EventModel.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "event_name", "event_venue", "date_created"],
      include: [
        {
          model: UserModel,
          attributes: ["user_name"],
        },
        {
          model: CommentModel,
          attributes: ["content", "date_created", "id"],
          include: {
            model: UserModel,
            attributes: ["user_name"],
          },
        },
      ],
    });
    const events = eventsData.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      loggedIn: req.session.logged_in,
      userName: req.session.user_name,
      events,
    });
  } catch (error) {
    res.render("dashboard", {
      loggedIn: req.session.logged_in,
      userName: req.session.user_name,
      error: "Failed to load events",
    });
  }
});

router.get("/new", withAuth, async function (req, res) {
  res.render("newevent", {
    loggedIn: req.session.logged_in,
  });
});

router.get("/edit/:id", withAuth, async function (req, res) {
  try {
    const eventData = await EventModel.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "event_name", "event_venue", "date_created"],
    });
    const post = eventData.get({ plain: true });
    res.render("editevent", {
      loggedIn: req.session.logged_in,
      post,
    });
  } catch (error) {
    res.render("editevent", {
      loggedIn: req.session.logged_in,
      error: "Failed to load event data",
    });
  }
});

module.exports = router;
