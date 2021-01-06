const express = require("express");
const uniqid = require("uniqid");
const { join } = require("path");
const { getPlaces, writePlaces } = require("../utilities/tools.js");

const placesRouter = express.Router();

const placePath = join(__dirname, "./places.json");

placesRouter.get("/", async (req, res) => {
  allPlaces = await getPlaces(placePath);

  res.send(allPlaces);
});

placesRouter.get("/:id", (req, res) => {
  console.log("GET ID");
  newPlace = places.find((place) => place.id === req.params.id);

  console.log(newPlace);
  res.send(places);
});

placesRouter.post("/", async (req, res) => {
  try {
    const allPlaces = await getPlaces(placePath);
    const newPlace = { ...req.body, id: uniqid() };
    await allPlaces.push(newPlace);
    writePlaces(placePath, allPlaces);
    res.status(201).send(newPlace);
  } catch (error) {
    console.log(error);
  }
});

placesRouter.put("/:id", async (req, res) => {
  console.log("PUT");
  try {
    const allPlaces = await getPlaces();
    let upDatedPlace = allPlaces.find((place) => place.id === req.params.id);
    if (upDatedPlace) {
      upDatedPlace = { ...req.body, id: uniqid() };
      allPlaces.push(upDatedPlace);
      writePlaces(placePath, allPlaces);
      res.status(200).send(upDatedPlace);
    } else {
      console.log("No element with such ID in the DB");
    }
  } catch (error) {
    console.log(error);
  }
});

placesRouter.delete("/", async (req, res) => {
  console.log("DELETE");

  places = places.filter((place) => place.id !== req.params.id);

  console.log(places);

  res.send(places);
});

module.exports = placesRouter;
