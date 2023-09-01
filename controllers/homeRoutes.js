const router = require('express').Router();
const EventModel = require('../models/Event');
const UserModel = require('../models/User');
const CommentModel = require('../models/Comment');

router.get('/', async function (req, res) {
    try { 
        const eventsData = await EventModel.findAll({
            attributes: [
                "event_image", "event_name", "event_artists", "event_date", "event_time", "event_venue"
            ],
            include: [
                {
                    model: UserModel,
                    attributes: ["user_name"]

                },
                {
                    model: CommentModel,
                    attributes: ["content", "date_created", "id",],
                    include: {
                        model: UserModel,
                        attributes: ["user_name"]
                    }
                   
                }
            ]
            
        });
        const events = eventsData.map((post) => post.get({ plain: true }));
            res.render('home',{
            loggedIn: req.session.logged_in, events
    
        })
    } catch (error) {
            res.render('home',{
            loggedIn: req.session.logged_in, 
            error:'Failed to load events in homeRoutes'

        })
    }
    
});
router.get('/event/:id', async function (req, res) {
    try { 
        const eventData = await EventModel.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
              "event_image", "event_name", "event_artist", "event_date", "event_time", "event_venue"
            ],
            include: [
                {
                    model: UserModel,
                    attributes: ["user_name"]

                },
                {
                    model: CommentModel,
                    attributes: ["content", "date_created", "id",],
                    include: {
                        model: UserModel,
                        attributes: ["user_name"]
                    }
                   
                }
            ]
            
        });
        const post = eventData.get({ plain: true });
            res.render('eventdetails',{
            loggedIn: req.session.logged_in, post
    
        })
    } catch (error) {
            res.render('eventdetails',{
            loggedIn: req.session.logged_in, 
            error:'Failed to load post'

        })
    }
    
});

router.get('/signup', function(req, res) {
    res.render('signup')
});

module.exports = router 
