import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { experience } from "./experience";

const server = express();
const port = process.env.PORT ?? 3003;

server.use(bodyParser.json());
server.use(cors({ methods: ["GET", "POST"] }));

server.get("/experience", (_, response) => {
  response.status(200).json(experience).send();
});

server.post<
  any,
  any,
  any,
  {
    name: string;
    email: string;
    message: string;
  }
>("/submit-form", (request, response) => {
  if (!request.body?.name) {
    response.status(400).send("El nombre del contacto debe ser enviado.");
    return;
  }

  response
    .status(200)
    .cookie("PW_2021-CV_Contacto", request.body.name, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
    .send();
});

server.use("*", (_, response) => {
  response.status(404).send("Endpoint inválido");
});

server.listen(port, () => {
  console.info(`Server started at: http://localhost:${port}}`);
});

module.exports = server;
