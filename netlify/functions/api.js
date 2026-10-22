const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

const films = [
  { id: 1, title: "The Shawshank Redemption", year: 1994, director: "Frank Darabont", genre: "Drama", rating: 9.3 },
  { id: 2, title: "The Godfather", year: 1972, director: "Francis Ford Coppola", genre: "Crime", rating: 9.2 },
  { id: 3, title: "The Dark Knight", year: 2008, director: "Christopher Nolan", genre: "Action", rating: 9.0 },
  { id: 4, title: "Inception", year: 2010, director: "Christopher Nolan", genre: "Sci-Fi", rating: 8.8 },
  { id: 5, title: "Interstellar", year: 2014, director: "Christopher Nolan", genre: "Sci-Fi", rating: 8.7 }
];

router.get("/", (req, res) => {
  res.json({ message: "Film API ishlayapti", endpoints: ["/api/films", "/api/films/:id"] });
});

router.get("/films", (req, res) => {
  res.json(films);
});

router.get("/films/:id", (req, res) => {
  const film = films.find((f) => f.id === Number(req.params.id));
  if (!film) {
    return res.status(404).json({ message: "Film topilmadi" });
  }
  res.json(film);
});

app.use("/api", router);
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
