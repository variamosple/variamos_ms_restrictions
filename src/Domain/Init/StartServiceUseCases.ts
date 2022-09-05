import express from "express";
// import sequelizeVariamos from "../../DataProviders/dataBase/VariamosORM";
import indexRoutes from "../../EntryPoints/restrictionEntryPoints";

const app = express();
var cors = require("cors");

// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);

async function init() {
  await app.listen(4003);
  console.log("Server on port", 4003);
}

init();
