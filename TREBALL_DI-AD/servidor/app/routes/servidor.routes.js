module.exports = app => {

    const users = require("../controllers/servidor.controller.js");
    var router = require("express").Router();

    // Crea un nou Usuari
    router.post("/", users.create);

    // Busca tots els Usuaris
    router.get("/", users.findAll);

    // Busca tots el Usuaris publicats
    // router.get("/published", users.findAllPublished);

    // Busca un Usuari per Id
    // router.get("/:id", users.findOne);

    // Actualiza un Usuari per Id
    // router.put("/:id", users.update);

    // Elimina un Usuari per Id
    // router.delete("/:id", users.delete);

    // Elimina tots els Usuaris
    // router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};