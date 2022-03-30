const petController = require("../controllers/pet.controller");

module.exports = (app) => {
    app.get("/api/pets", petController.getAllPets);
    app.post("/api/pets", petController.createPet);
    app.get("/api/pets/:id", petController.getOnePet);
    app.delete("/api/pets/:id", petController.deletePet);
    app.put("/api/pets/:id", petController.updatePet);
}