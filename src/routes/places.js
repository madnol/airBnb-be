const express = require("express");
const uniqid = require("uniqid");

const placesRouter = express.Router();

let places = [];

placesRouter.get("/", (req, res) => {
  console.log("GET");

  res.send(places);
});

placesRouter.get("/:id", (req, res) => {
  console.log("GET ID");
  newPlace = places.find((place) => place.id === req.params.id);

  console.log(newPlace);
  res.send(places);
});

placesRouter.post("/", (req, res) => {
  console.log("POST");

  places.push({ ...req.body, id: uniqid() });

  res.send(places);
});

placesRouter.put("/", (req, res) => {
  console.log("PUT");

  res.send(places);
});

placesRouter.delete("/", (req, res) => {
  console.log("DELETE");

  places = places.filter((place) => place.id !== req.params.id);

  console.log(places);

  res.send(places);
});

module.exports = placesRouter;
