const router = require('express').Router();
const eventRoutes = require('./userRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
