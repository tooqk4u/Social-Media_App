const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Setup the prefix for the routes created user and thoughts. 
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
})
module.exports = router;