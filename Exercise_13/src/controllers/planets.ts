import { Request, Response } from "express";

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

const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};
const getOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  const path = planets.find((n) => n.id === Number(id));
  res.status(200).json(path);
};
const create = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet: Planet = { id, name };
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "New Planet was created." });
};
const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  res.status(200).json({ msg: "The name property was modified" });
  console.log(planets);
};
const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ msg: `The ${id} param was deleted` });
  console.log(planets);
};

export { getAll, getOneById, create, updateById, deleteById };
