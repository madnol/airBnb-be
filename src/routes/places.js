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
    const allPlaces = await getPlaces(placePath);
    const newArrayPlaces = allPlaces.filter(
      (place) => place.id !== req.params.id
    );
    const updatedPlace = { ...req.body, id: req.params.id };

    newArrayPlaces.push(updatedPlace);

    writePlaces(placePath, newArrayPlaces);

    res.send(updatedPlace);
  } catch (error) {
    console.log(error);
  }
});

placesRouter.delete("/:id", async (req, res) => {
  console.log("DELETE");
  const allPlaces = await getPlaces(placePath);
  newArrayPlaces = allPlaces.filter((place) => place.id !== req.params.id);

  writePlaces(placePath, newArrayPlaces);
  console.log(newArrayPlaces);

  res.send(newArrayPlaces);
});

module.exports = placesRouter;
