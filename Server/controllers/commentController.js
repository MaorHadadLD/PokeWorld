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

const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;

        // Get top-level comments
        const comments = await Comment.find({ post: postId, parentComment: null })
            .populate('user', 'username profilePicture')
            .sort({ date: -1 });

        // Attach replies to each top-level comment
        const commentsWithReplies = await Promise.all(comments.map(async comment => {
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
        const {commentId} = req.params;
        const userId = req.user._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({message: 'Comment not found'});
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
        res.status(200).json({message: 'Comment liked/unliked successfully', likes: comment.likes.length});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
}

const getCommentStats = async (req, res) => {
    try {
        const { postId } = req.params;

        const totalComments = await Comment.countDocuments({ post: postId });
        const replies = await Comment.countDocuments({ post: postId, parentComment: { $ne: null } });
        const topLevel = totalComments - replies;

        res.status(200).json({
            totalComments,
            topLevelComments: topLevel,
            nestedReplies: replies
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = {
    getSingleComment,
    updateComment,
    deleteComment,
    addComment,
    getPostComments,
    likeComment,
    getCommentStats
}