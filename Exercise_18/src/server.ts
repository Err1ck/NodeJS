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
  createImage,
} from "../src/controllers/planets.js";
import { logIn, signUp, logOut } from "./controllers/users.js";
import authorize from "./authorize.js";
import multer from "multer";
import "./passport.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const app = express();
const port = process.env.PORT;

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

app.use(morgan("dev"));
app.use(express.json());

app.get("/GET/api/planets/", getAll);

app.get("/GET/api/planets/:id", getOneById);

app.post("/POST /api/planets/", create);

app.put("/PUT /api/planets/:id/", updateById);

app.delete("DELETE /api/planets/:id/", deleteById);

app.post("/api/planets/:id/image", /* upload.single("image"),  */ createImage);

app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);
app.get("/api/users/logout", authorize, logOut);

app.listen(port, () => {
  console.log(`Se inicializa el puerto: http://localhost:${port}/`);
});
