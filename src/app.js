import clienteController from "./controller/clienteController.js";
import servicoController from "./controller/servicoController.js";
import usuarioController from "./controller/usuarioController.js";

import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(clienteController);
app.use(usuarioController);
app.use(servicoController);

let port = process.env.PORT;
app.listen(port, () => console.log("API SUBIU!"));
