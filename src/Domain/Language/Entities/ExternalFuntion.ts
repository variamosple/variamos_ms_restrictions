import Sequelize from "sequelize";
import sequelize from "../../../DataProviders/dataBase/VariamosORM";

export class ExternalFunction {
  id?: number;
  name?: string;
  label?: string;
  url?: string;
  method?: string;
  header?: object;
  request?: object;
  resulting_action?: string;
  language_id?: number;

  constructor(
    id?: number,
    name?: string,
    label?: string,
    url?: string,
    method?: string,
    header?: object,
    request?: object,
    resulting_action?: string,
    language_id?: number
  ) {
    this.id = id;
    this.name = name;
    this.label = label;
    this.url = url;
    this.method = method;
    this.header = header;
    this.request = request;
    this.resulting_action = resulting_action;
    this.language_id = language_id;
  }
}

export const OrmExternalFunction = sequelize.define(
  "external_function",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: Sequelize.TEXT },
    label: { type: Sequelize.TEXT },
    url: { type: Sequelize.TEXT },
    method: { type: Sequelize.TEXT },
    header: { type: Sequelize.JSONB },
    request: { type: Sequelize.JSONB },
    resulting_action: { type: Sequelize.TEXT },
    language_id: { type: Sequelize.INTEGER },
  },
  {
    freezeTableName: true,
    schema: "variamos",
    timestamps: false,
  }
);

export const ExternalFunctionSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    label: { type: "string" },
    url: { type: "string" },
    method: { type: "string" },
    header: { type: "object" },
    request: { type: "object" },
    resulting_action: { type: "string" },
    language_id: { type: "number" },
  },
  required: ["name", "label", "url", "method", "resulting_action"],
  additionalProperties: false,
};
