const { Pet } = require('../models/pet.model');

module.exports.getAllPets = (req, res) => {
    Pet.find().sort({type:1})
        .then(pets => { res.json(pets) })
        .catch(err => { res.json(err) })
}

module.exports.createPet = (req, res) => {
    const {name, type, description, skill1, skill2, skill3} = req.body;
    Pet.create({
        name, 
        type,
        description, 
        skill1, 
        skill2, 
        skill3
    })
        .then(pet => { res.json(pet) })
        .catch(err => { res.status(400).json(err) })
}

module.exports.getOnePet = (req, res) => {
    Pet.findById({_id: req.params.id})
        .then(pet => { res.json(pet) })
        .catch(err => { res.json(err) })
}

module.exports.deletePet = (req, res) => {
    Pet.findByIdAndDelete({_id: req.params.id})
        .then(deletedPet => req.json(deletedPet))
        .catch(err => { res.json(err) })
}

module.exports.updatePet = (req, res) => {
    const {name, type, description, skill1, skill2, skill3} = req.body;
    Pet.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
    
        .then(updatedPet => { res.json(updatedPet) })
        .catch(err => { res.status(400).json(err) })
}