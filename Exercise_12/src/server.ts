import express from "express";
import "express-async-errors";
import morgan from "morgan";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("/GET/api/planets/", (req, res) => {
  res.status(200).json(planets);
});

app.get("/GET/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const path = planets.find((n) => n.id === Number(id));
  res.status(200).json(path);
});

app.post("/POST /api/planets/", (req, res) => {
  const { id, name } = req.body;
  const planet = { id, name };
  planets = [...planets, planet];
  res.status(201).json({ msg: "New Planet was created." });
  console.log(planets);
});

app.put("/PUT /api/planets/:id/", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  res.status(200).json({ msg: "The name property was modified" });
  console.log(planets);
});

app.delete("DELETE /api/planets/:id/", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ msg: `The ${id} param was deleted` });
  console.log(planets);
});

app.listen(port, () => {
  console.log(`Se inicializa el puerto: http://localhost:${port}/`);
});
