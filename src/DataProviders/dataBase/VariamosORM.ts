import { Sequelize } from "sequelize";

const sequelizeVariamos = new Sequelize(
  "VariamosDB",
  "adminpg",
  "a=m=8hos.G!-s<*M1G",
  {
    host: "variamos-db-2024.postgres.database.azure.com",
    // host: "db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialectOptions: {
      ssl: true,
    },
  }
);
export default sequelizeVariamos;
