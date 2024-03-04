const db = require("../models");
const User = db.user;
const Role = db.role;

exports.listRoles = (req, res) => {
  Role.findAll()
    .then(roles => {
      res.status(200).send(roles);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getMe = (req, res) => {
  User.findByPk(req.userId)
    .then(user => {
      user.getRoles()
        .then(roles => {
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: roles.map(role => role.name)
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateMe = (req, res) => {
  User.findByPk(req.userId)
    .then(user => {
      user.update(req.body)
        .then(() => {
          res.status(200).send({ message: "User was updated successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.listUsers = (req, res) => {
  User.findAll()
    .then(async users => {
      const usersWithRoles = [];
      for (const user of users) {
        const roles = await user.getRoles();
        usersWithRoles.push({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: roles.map(role => role.name)
        });
      }
      res.status(200).send(usersWithRoles);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.updateUser = (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.update(req.body)
        .then(() => {
          res.status(200).send({ message: "User was updated successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
