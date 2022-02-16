const sql = require("./db.js");

// constructor
const Users = function(user) {
  this.title = user.title;
  this.description = user.description;
  this.published = user.published;
};

Users.getAll = (username, result) => {
  let query = "SELECT * FROM users";

  if (username) {
    query += ` WHERE username LIKE '%${username}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Usuaris: ", res);
    result(null, res);
  });
};

Users.create = (nouUsuari, result) => {
  sql.query("INSERT INTO users SET ?", nouUsuari, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Usuari creat: ", { id: res.insertId, ...nouUsuari });
    result(null, { id: res.insertId, ...nouUsuari });
  });
};

Users.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Usuari trobat: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "No trobat" }, null);
  });
};

Users.getAllPublished = result => {
  sql.query("SELECT * FROM users WHERE published=true", (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Usuaris: ", res);
    result(null, res);
  });
};

Users.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET username = ?, full_name = ?, avatar = ? WHERE id = ?",
    [user.username, user.full_name, user.avatar, id], (err, res) => {

      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {

        result({ kind: "No Trobat" }, null);
        return;
      }

      console.log("Usuari actualizat: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

Users.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {

      result({ kind: "No trobat" }, null);
      return;
    }

    console.log("Eliminat Usuari amb id: ", id);
    result(null, res);
  });
};

Users.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminats ${res.affectedRows} Usuaris`);
    result(null, res);
  });
};

module.exports = Users;