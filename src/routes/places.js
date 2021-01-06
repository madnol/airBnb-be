const express = require("express");
const uniqid = require("uniqid");
const { join } = require("path");
const { getPlaces, writePlaces } = require("../utilities/tools.js");

const placesRouter = express.Router();
//Directory of the path
const placePath = join(__dirname, "./places.json");

placesRouter.get("/", async (req, res) => {
  allPlaces = await getPlaces(placePath);

  res.send(allPlaces);
});

placesRouter.get("/:id", async (req, res) => {
  //get the array of object
  allPlaces = await getPlaces(placePath);

  console.log("GET ID");
  newPlace = allPlaces.find(place => place.id === req.params.id);

  console.log(newPlace);
  res.send(newPlace);
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
      place => place.id !== req.params.id
    );
    const updatedPlace = { ...req.body, id: req.params.id };

    newArrayPlaces.push(updatedPlace);

    writePlaces(placePath, newArrayPlaces);

    res.send(updatedPlace);
  } catch (error) {
    console.log(error);
  }
});

// placesRouter.patch("/:id", async (req, res) => {
//   // console.log("PATCH");
//   try {
//     const allPlaces = await getPlaces(placePath);
//     // const newPlaces = allPlaces.filter(place => place.id !== req.params.id);
//     const patched = allPlaces.find(place => place.id === req.params.id);
//     const { newparam1, newparam2 } = req.body;
//     if (newparam1) {
//       patched.newparam1 = newparam1;
//     }
//     if (newparam2) {
//       patched.newparam2 = newparam2;
//     }
//     // allPlaces.push(patchedPlace);

//     writePlaces(placePath, allPlaces);

//     res.send(patched);
//   } catch (error) {
//     console.log(error);
//   }
// });

placesRouter.delete("/:id", async (req, res) => {
  console.log("DELETE");
  const allPlaces = await getPlaces(placePath);
  newArrayPlaces = allPlaces.filter(place => place.id !== req.params.id);

  writePlaces(placePath, newArrayPlaces);
  console.log(newArrayPlaces);

  res.send(newArrayPlaces);
});

module.exports = placesRouter;
