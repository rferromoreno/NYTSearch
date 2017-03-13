import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import config from "./config.json";
import logger from "./logger";

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

    // api router
    app.use("/api", routes({ config }));

    // Entra por aca si no entró por alguna de las otras rutas 
    // (en otras palabras, puso cualquier cosa)
    app.use(function(req, res) {
        let error = {
          "statusCode" : "404",
          "text" : "Not Found"
        };
         res.status(212).json(error);

    });

    //Catch all error handling
    app.use(function(error, req, res, next) {
       let errorSend = {
          "statusCode" : "500",
          "text" : error.message
        };

        res.status(212).json(errorSend);

    });

    app.server.listen(process.env.PORT || config.port);
    console.log(`Started on port ${app.server.address().port}`);
    logger.info(`Started on port ${app.server.address().port}`);
}

start();
