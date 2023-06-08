const usersRouter = require("express").Router();
const {
  readAllUser,
  createUser,
  updateUser,
  deleteUser,
  readUser,
} = require("../controllers/users.controller");
const { auth, isAdmin } = require("../middlewares/auth");


usersRouter.get("/users", auth, isAdmin, readAllUser);
usersRouter.post("/users", auth, isAdmin, createUser);
usersRouter.patch("/users/:id", auth, isAdmin, updateUser);
usersRouter.delete("/users/:id", auth, isAdmin, deleteUser);
usersRouter.get("/users/:id", auth, isAdmin, readUser);

module.exports = usersRouter;
