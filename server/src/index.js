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

  // TODO: Devolver mensaje de error (404/500/personalizado) para que 
  // la parte web pueda mostrar un mensaje amigable
  // Entra por aca si no entró por alguna de las otras rutas 
  // (en otras palabras, puso cualquier cosa)
  app.use(function(req, res, next){
      res.status(404).send('Error');
   });


  app.server.listen(process.env.PORT || config.port);
  console.log(`Started on port ${app.server.address().port}`);
}

start();
