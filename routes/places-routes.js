const express = require("express");

const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Taipei 101",
    description: "One of the most famous landmarks in Taiwan",
    location: {
      lat: 25.0338089,
      lng: 121.5623674,
    },
    address: "110台北市信義區信義路五段7號",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Taipei 102",
    description: "One of the most famous landmarks in Taiwan",
    location: {
      lat: 25.0338089,
      lng: 121.5623674,
    },
    address: "110台北市信義區信義路五段7號",
    creator: "u1",
  },
  {
    id: "p3",
    title: "Taipei 103",
    description: "One of the most famous landmarks in Taiwan",
    location: {
      lat: 25.0338089,
      lng: 121.5623674,
    },
    address: "110台北市信義區信義路五段7號",
    creator: "u2",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid; // { pid: p1 }
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  console.log("GET Request in Places");

  if (!place) {
    // use throw error for synchronous call
    throw new HttpError("Cound not find a place for the provided id.", 404);
  }

  res.json({ place }); // => { place } => { place: place }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (userPlaces.length === 0) {
    // use next for asynchronous call
    return next(
      new HttpError("Cound not find any place for the provided user id.", 404)
    );
  }

  res.json({ userPlaces });
});

module.exports = router;
