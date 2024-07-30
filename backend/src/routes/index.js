const express = require("express");
const todoRoute = require("./todo.routes");

const routes = express.Router();

routes.use("/api/v1/todo", todoRoute);

module.exports = routes;
