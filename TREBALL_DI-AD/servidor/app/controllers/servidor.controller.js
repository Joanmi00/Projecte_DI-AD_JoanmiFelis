const Users = require("../models/servidor.model.js");

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  
  const username = req.query.username;
  Users.getAll(username, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Error."
      });

    else res.send(data);
  });
};

exports.create = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "No pot estar buit!"
    });
  }

  // Create a Tutorial
  const user = new Users({
    username: req.body.username,
    full_name: req.body.full_name,
    avatar: req.body.avatar || false
  });

  // Save Tutorial in the database
  Users.create(user, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Error."
      });

    else res.send(data);
  });
};