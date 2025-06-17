const Comment = require('../models/Comment');
const mongoose = require('mongoose');

const getSingleComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId)
            .populate('user', 'username profilePicture')
            .populate('likes', 'username profilePicture');

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const replies = await Comment.find({ parentComment: commentId })
            .populate('user', 'username profilePicture')
            .populate('likes', 'username profilePicture')
            .sort({ date: 1 });

        res.status(200).json({
            ...comment.toObject(),
            replies,
            likesCount: comment.likes.length
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== userId.tostring()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        comment.text = text;
        await comment.save();

        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        await Comment.deleteMany({ parentComment: comment._id});
        await comment.deleteOne();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text, parentComment } = req.body;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const newComment = new Comment({
            user: userId,
            post: postId,
            text,
            perentComment: parentComment || null,
            date: new Date()
        });

        const savedComment = await newComment.save();
        await savedComment.populate('user', 'username profilePicture');

        res.locals.socketEvent = {
            event: 'newComment',
            data: savedComment
        };

        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;

        // Get top-level comments
        const topComments = await Comment.find({ post: postId, parentComment: null })
            .populate('user', 'username profilePicture')
            .sort({ date: -1 });

        // Attach replies to each top-level comment
        const commentsWithReplies = await Promise.all(topComments.map(async comment => {
            const replies = await Comment.find({ parentComment: comment._id })
                .populate('user', 'username profilePicture')
                .sort({ date: 1 });

            return {
                ...comment.toObject(),
                replies
            };
        }));

        res.status(200).json(commentsWithReplies);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const index = comment.likes.indexOf(userId);
        if (index === -1) {
            // User has not liked the comment, add like
            comment.likes.push(userId);
        } else {
            // User has already liked the comment, remove like
            comment.likes.splice(index, 1);
        }

        await comment.save();
        res.status(200).json({ message: index === -1 ? 'Liked' : 'Unliked', likes: comment.likes.length });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

const getCommentStats = async (req, res) => {
  try {
    const { postId } = req.params;

    const totalComments = await Comment.countDocuments({ post: postId });
    const nestedReplies = await Comment.countDocuments({ post: postId, parentComment: { $ne: null } });
    const topLevelComments = totalComments - nestedReplies;

    res.status(200).json({
      totalComments,
      topLevelComments,
      nestedReplies,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
    getSingleComment,
    updateComment,
    deleteComment,
    addComment,
    getPostComments,
    likeComment,
    getCommentStats
}