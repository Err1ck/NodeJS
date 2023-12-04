import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/postgres");
/* console.log(db); */

const setupDB = async () => {
  db.none(`
  DROP TABLE IF EXISTS planets

  CREATE TABLE planets(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
    );
  `);
  await db.none(`INSERT INTO planets(name) VALUES('Earth')`);
  await db.none(`INSERT INTO planets(name) VALUES('Mars')`);
  await db.none(`INSERT INTO planets(name) VALUES('Jupiter')`);

  const planets = await db.many(`SELECT * FROM planets`);
  console.log(planets);
};
setupDB();

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets`);
  res.status(200).json(planets);
};
const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id));
  res.status(200).json(planet);
};

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const create = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  const validatedNewPlanet = planetSchema.validate(newPlanet);
  if (validatedNewPlanet.error) {
    return res
      .status(400)
      .json({ msg: validatedNewPlanet.error.details[0].message });
  } else {
    res.status(201).json({ msg: "The planet was created" });
  }
};
const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  res.status(200).json({ msg: "The name property was modified" });
};
const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ msg: `The ${id} param was deleted` });
};

export { getAll, getOneById, create, updateById, deleteById };
