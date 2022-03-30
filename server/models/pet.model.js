const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Name is required."],
        minlength: [3, "Name must be at least 3 characters long."]
    },
    type: { 
        type: String,
        required: [true, "Type is required."],
        minlength: [3, "Type must be at least 3 characters long."]
    },
    description: { 
        type: String,
        required: [true, "Description is required."],
        minlength: [3, "Description must be at least 3 characters long."]
    },
    skill1: { 
        type: String,
        required: false
    },
    skill2: { 
        type: String,
        required: false
    },
    skill3:{
        type: String,
        required: false
    }
}, { timestamp: true });

module.exports.Pet = mongoose.model('Pet', PetSchema);
