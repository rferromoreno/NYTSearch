import { version } from "../../package.json";
import { Router } from "express";
//import books from "./books.route";
//import authors from "./authors.route";
import search from "./search.route";

export default ({ config, db }) => {
  const api = Router();

  //api.use("/books", books({ config, db }));
  //api.use("/authors", authors({ config, db }));

  api.use("/search", search({ config }));


  api.get("/", (req, res) => {
    res.json({ version });
  });

  return api;
};
