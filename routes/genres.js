const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Drama" },
  { id: 5, name: "Anime" },
  { id: 6, name: "Musical" }
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  // Check id and return the found one
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("Genre with the given ID was not found.");

  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

// Put (update) genre with given id with the name in the body
router.put("/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("Genre with the given ID was not found.");

  const { error } = validateGenre(genre);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("Genre with the given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const validateGenre = genre => {
  schema = {
    name: Joi.string()
      .required()
      .min(3)
  };

  const { error } = Joi.validate(schema, genre);
  if (error) return error;
};

module.exports = router;
