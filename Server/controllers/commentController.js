const Post = require('../models/Post');
const Comment = require('../models/Comment');

const getSingleComment = async (req, res) => {
    const { postId, commentId } = req.params;
    
    try {
        const post = await Post.findById(postId).populate('comments.user', 'username');

        const comment = post.comments.id(commentId);
        if(!comment) {
            return res.status(404).json({message: 'Comment not found'});
        }

        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

const updateComment = async (req, res) => {
    const { postId, commentId} = req.params;
    const { text } = req.body;

    try {
        const post = await Post.findById(postId);
        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({message: 'Comment not found'});
        }

        if(comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: 'You are not authorized to update this comment'});
        }

        comment.text = text;
        await post.save();

        res.status(200).json({message: 'Comment updated successfully', comment});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

const deleteComment = async (req, res) => {
    const { postId, commentId} = req.params;

    try {
        const post = await Post.findById(postId);

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({message: 'Comment not found'});
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: 'You are not authorized to delete this comment'});
        }

        comment.remove();
        await post.save();
        res.status(200).json({message: 'Comment deleted successfully'});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

const addComment = async (req, res) => {
    try {
        const {postId} = req.params;
        const {text, parentComment} = req.body;
        const userId = req.user._id;

        const newComment = new Comment({
            user: userId,
            post: postId,
            text,
            perentComment: parentComment || null,
            date: new Date()
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
}

module.exports = {
    getSingleComment,
    updateComment,
    deleteComment,
    addComment
}