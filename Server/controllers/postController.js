const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const {content, image} = req.body;
        const userId = req.user._id;

        if (!content) {
            return res.status(400).json({message: 'Content is required'});
        }

        const newPost = new Post({
            user: userId,
            content,
            image: image || null,
        });

        const saveedPost = await newPost.save();

        res.status(201).json(saveedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {
    createPost,
}