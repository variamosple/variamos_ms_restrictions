import { json, Request, Response } from "express";
import { QueryResult } from "pg";
import Ajv from "ajv";
import { pool } from "../../DataProviders/dataBase/VariamosDB";
import { RequestAPI, RequestApiSchema } from "../Init/entities/request";
import {
  ResponseAPIError,
  ResponseAPISuccess,
} from "../Init/entities/response";
import { Model, ModelSchema } from "./Entities/Model";
import { Element } from "./Entities/Element";
import { Utils } from "../../Addons/Utils";

const ajv = new Ajv();
const utils = new Utils();

export default class RestrictionManagement {
  uniqueName = async (req: Request, res: Response): Promise<Response> => {
    try {
      let validate = ajv.compile(RequestApiSchema);
      let valid = validate(req.body);

      if (!valid)
        throw new Error(
          "Something wrong in request definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      try {
        ajv.addKeyword("allowedKeyword");
      } catch {}

      validate = ajv.compile(ModelSchema);
      valid = validate(req.body.data.model);
      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      let model: Model = new Model();
      model = Object.assign(model, req.body.data.model);

      let configRestriction = {};
      configRestriction = Object.assign(
        configRestriction,
        req.body.data.restriction
      );

      //ALLOWED and DENIED
      let restrictionResponse = {
        state: "DENIED",
        meesage: "Restriction applied by unique name",
      };

      const elementsFilter: Element[] = model.elements.filter(
        (element) =>
          element.name === element.name && element.type === element.type
      );

      if (elementsFilter.length <= 1) {
        restrictionResponse.state = "ALLOWED";
        restrictionResponse.meesage = "";
      }

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Restriction unique name successfully";
      responseApi.data = JSON.parse(JSON.stringify(restrictionResponse));
      responseApi.transactionId = "uniqueNameRestriction_" + utils.generateId();

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "03";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "uniqueNameRestriction_" + utils.generateId();
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  quantityElement = async (req: Request, res: Response): Promise<Response> => {
    try {
      let validate = ajv.compile(RequestApiSchema);
      let valid = validate(req.body);
      console.log(req.body.data.restriction);
      if (!valid)
        throw new Error(
          "Something wrong in request definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      try {
        ajv.addKeyword("allowedKeyword");
      } catch {}

      validate = ajv.compile(ModelSchema);
      valid = validate(req.body.data.model);
      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      let model: Model = new Model();
      model = Object.assign(model, req.body.data.model);

      let configRestriction = {};
      configRestriction = Object.assign(
        configRestriction,
        req.body.data.restriction
      );

      console.log(configRestriction);

      //ALLOWED and DENIED
      let restrictionResponse = {
        state: "DENIED",
        meesage: "Restriction applied by unique name",
      };

      const elementsFilter: Element[] = model.elements.filter(
        (element) =>
          element.name === element.name && element.type === element.type
      );

      if (elementsFilter.length <= 1) {
        restrictionResponse.state = "ALLOWED";
        restrictionResponse.meesage = "";
      }

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Restriction unique name successfully";
      responseApi.data = JSON.parse(JSON.stringify(restrictionResponse));
      responseApi.transactionId =
        "quantityElementRestriction_" + utils.generateId();

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "03";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId =
        "quantityElementRestriction_" + utils.generateId;
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };
}
