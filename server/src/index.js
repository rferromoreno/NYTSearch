import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import middleware from "./middleware";
import routes from "./routes";
import config from "./config.json";
import services from "./services";
import logger from "./logger"

async function start() {
  let app = express();
  app.server = http.createServer(app);

  // 3rd party middleware
  app.use(
    cors({
      exposedHeaders: config.corsHeaders
    })
  );

  app.use(
    bodyParser.json({
      limit: config.bodyLimit
    })
  );

  // internal middleware
  app.use(middleware({ config }));

  // api router
  app.use("/api", routes({ config }));

  app.server.listen(process.env.PORT || config.port);
  console.log(`Started on port ${app.server.address().port}`);
}

start();
