const Card = require('../models/Card');

const addCard = async (req, res) => {
    try {
        const {name, image, description, grading, tags} = req.body;
        const card = new Card({
            name,
            image,
            description,
            grading,
            owner: req.user._id,
            tags
        });

        const saved = await card.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({message: 'Server error'});
    }
};

const getMyCards = async (req, res) => {
    try {
        const cards = await Card.find({owner: req.user._id});
        res.json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({message: 'Server error'});
    }
};

const deleteCard = async (req, res) => {
    try {
        await Card.findByIdAndDelete(req.params.id);
        res.json({message: 'Card deleted successfully'});
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {
    addCard,
    getMyCards,
    deleteCard
};