const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/roles", controller.listRoles);

  app.get(
    "/api/user/me",
    [authJwt.verifyToken],
    controller.getMe
  );

  app.put(
    "/api/user/me",
    [authJwt.verifyToken],
    controller.updateMe
  );

  app.get(
    "/api/user/users",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.listUsers
  );

  app.put(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );
};
