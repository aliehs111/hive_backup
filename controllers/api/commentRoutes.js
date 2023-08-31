const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id, // Assuming you store the user's ID in the session
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensuring the comment belongs to the current user
      },
    });

    if (!updatedComment[0]) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensuring the comment belongs to the current user
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
