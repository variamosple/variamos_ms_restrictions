import express from "express";

const app = express();

import indexRoutes from "../../EntryPoints/languageManagement";

var cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);

async function init(){
  await app.listen(4000);
  console.log("Server on port", 4000);
}

init(); 
