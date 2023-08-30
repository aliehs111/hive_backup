const router = require('express').Router();
const eventRoutes = require('./userRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;
