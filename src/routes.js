const express = require("express")
const routes = express.Router()
const views = __dirname + "/views/"

const profile = {
  name: "Rafael",
  avatar: "https://avatars.githubusercontent.com/u/59876287?v=4",
  "monthly-budget": 5000,
  "hours-per-day": 5,
  "days-per-week": 5,
  "vacation-per-year": 4
}

// request, response
routes.get("/", (req, res) => res.render(views + "/index"))
routes.get("/job", (req, res) => res.render(views + "/job"))
routes.get("/job/edit", (req, res) => res.render(views + "/job-edit"))
routes.get("/profile", (req, res) => res.render(views + "/profile", { profile }))


module.exports = routes;