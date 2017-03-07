import { Router } from "express";

import newsMiddleWare from '../middleware/news.middleware';
import checkUrlMiddleware from '../middleware/urlchecker.middleware';

export default ({ config }) => {
  const api = Router();

  api.get("/:queryString?/:startDate?/:endDate?", 
            newsMiddleWare,
            checkUrlMiddleware);

  return api;
};
