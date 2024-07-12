const usersRouter = require("./users");
const postsRouter = require("./posts");
const commentsRouter = require("./comment");
const authRouter = require("./auth");

function route(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/posts", postsRouter);
  app.use("/api/v1/comment", commentsRouter);
}

module.exports = route;
