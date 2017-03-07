import { Router } from "express";

const newsMiddleWare = require('../middleware/news.middleware');
const checkUrlMiddleware = require('../middleware/urlchecker.middleware');

export default ({ config }) => {
  const api = Router();

/*
  api.get("/", (req, res) => {
    res.json('');
  });
*/

  api.get("/:queryString?/:startDate?/:endDate?", 
            newsMiddleWare,
            checkUrlMiddleware);

  return api;
};
