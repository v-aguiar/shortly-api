﻿import express, { json } from "express";

import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import router from "./routes/router.js";

const server = express();

dotenv.config();

server.use(cors());
server.use(json());

server.use(router);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(
    chalk.bold.greenBright("\n🚀 Server is running!") +
      chalk.bold.cyanBright("\n\nListening on port " + PORT + "...\n")
  );
});
