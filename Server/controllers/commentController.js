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

module.exports = {
    getSingleComment,
}