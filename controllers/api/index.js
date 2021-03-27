const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./bookRoutes');

router.use('/users', userRoutes);
router.use('/books', projectRoutes);

module.exports = router;
