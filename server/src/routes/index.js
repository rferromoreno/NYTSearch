import { version } from "../../package.json";
import { Router } from "express";
import search from "./search.route";

export default ({ config, db }) => {
    const api = Router();

    api.use("/search", search({ config }));

    api.use("/*", (req, res, next) => {
      next(new Error("Not Found"));
    });
    
    return api;
};
