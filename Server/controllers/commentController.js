const Post = require('../models/Post');

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

module.exports = {
    getSingleComment,
    updateComment,
    deleteComment
}