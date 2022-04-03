const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    addReaction,
    updateThought,
    deleteThought,
    removeReaction
} = require('../../controllers/thought-controller')


router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)
    
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)


module.exports = router;