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

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        .populate('user', 'username profilePicture')
        .populate('comments.user', 'username')
        .populate('likes', 'username profilePicture')
        .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({message: 'Server error while fetching posts'});
    }
};

module.exports = {
    createPost,
    getAllPosts,
}