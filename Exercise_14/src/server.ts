import express from "express";
import "express-async-errors";
import morgan from "morgan";
import "dotenv/config";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "../src/controllers/planets";

const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));

app.get("/GET/api/planets/", getAll);

app.get("/GET/api/planets/:id", getOneById);

app.post("/POST /api/planets/", create);

app.put("/PUT /api/planets/:id/", updateById);

app.delete("DELETE /api/planets/:id/", deleteById);

app.listen(port, () => {
  console.log(`Se inicializa el puerto: http://localhost:${port}/`);
});
