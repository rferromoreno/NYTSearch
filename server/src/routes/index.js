import { version } from "../../package.json";
import { Router } from "express";
import search from "./search.route";

export default ({ config, db }) => {
  const api = Router();

  api.use("/search", search({ config }));

  api.get("/", (req, res) => {
    res.json({ version });
  });

  return api;
};
