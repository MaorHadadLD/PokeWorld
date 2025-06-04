const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    description: {
        type: String,
        enum: ['Common', 'Uncommon', 'Rare', 'Ultra Rare'],
        default: 'Common'
    },
    grading: {
        company: {
            type: String,
            enum: ['PSA', 'BGS', 'CGC'],
            default: 'PSA'
        },
        grade: {
            type: String,
            enum: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
            default: '10'
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tags: [{
        type: String
    }],
    cratedAt: {
        type: Data,
        default: Data.now
    }
});

module.exports = mongoose.model('Card', cardSchema);