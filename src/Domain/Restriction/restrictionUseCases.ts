import { json, Request, Response } from "express";
import { QueryResult } from "pg";
import Ajv, { str } from "ajv";
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

      let configRestriction: any = {};
      configRestriction = Object.assign(
        configRestriction,
        req.body.data.restriction
      );

      //ALLOWED and DENIED
      let restrictionResponse = {
        state: "DENIED",
        message: "Restriction applied by unique name",
      };

      let elemntsFound = 0;
      for (let i = 0; i < model.elements.length; i++) {
        const element: Element = model.elements[i];

        for (let a = 0; a < configRestriction.definition.elements.length; a++) {
          const elementsGroup = configRestriction.definition.elements[a];
          if (elementsGroup.includes(element.type)) {
            for (let x = 0; x < model.elements.length; x++) {
              const elementFind: Element = model.elements[x];
              if (
                element.id !== elementFind.id &&
                element.name === elementFind.name &&
                elementsGroup.includes(elementFind.type)
              ) {
                elemntsFound++;
                break;
              }
            }
          }
        }
        if (elemntsFound > 0) break;
      }

      if (elemntsFound === 0) {
        restrictionResponse.state = "ALLOWED";
        restrictionResponse.message = "";
      }

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Unique name restriction applied successfully";
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

      let configRestriction: any = {};
      configRestriction = Object.assign(
        configRestriction,
        req.body.data.restriction
      );

      //ALLOWED and DENIED
      let restrictionResponse = {
        state: "DENIED",
        message: "Restriction applied by quantity element",
      };

      let message = restrictionResponse.message;

      let elemntsFound = 0;

      configRestriction.definition.forEach((object: any) => {
        const quantityElement = model.elements.filter(
          (element) => element.type === object.element
        );

        if (quantityElement.length > object.max) {
          restrictionResponse.state = "DENIED";
          elemntsFound++;
          message =
            message +
            " - max quantity for " +
            object.element +
            " element is " +
            object.max;
          //DENIED
        } else if (quantityElement.length < object.min) {
          message =
            message +
            " - min quantity for " +
            object.element +
            " element is " +
            object.min;
          //ALLOWED

          if (elemntsFound === 0) restrictionResponse.state = "ALLOWED";
        }
      });

      if (elemntsFound === 0) {
        restrictionResponse.state = "ALLOWED";
        message !== restrictionResponse.message
          ? (restrictionResponse.message = message)
          : (restrictionResponse.message = "");
      }

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Quantity element restriction applied successfully";
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
        "quantityElementRestriction_" + utils.generateId();
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  quantityTarget = async (req: Request, res: Response): Promise<Response> => {
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

      console.log(model);

      let configRestriction: any = {};
      configRestriction = Object.assign(
        configRestriction,
        req.body.data.restriction
      );

      //ALLOWED and DENIED
      let restrictionResponse = {
        state: "DENIED",
        message: "Restriction applied by quantity element",
      };

      let message = restrictionResponse.message;

      let elemntsFound = 0;

      configRestriction.definition.forEach((object: any) => {
        const quantityElement = model.elements.filter(
          (element) => element.type === object.element
        );

        if (quantityElement.length > object.max) {
          restrictionResponse.state = "DENIED";
          elemntsFound++;
          message =
            message +
            " - max quantity for " +
            object.element +
            " element is " +
            object.max;
          //DENIED
        } else if (quantityElement.length < object.min) {
          message =
            message +
            " - min quantity for " +
            object.element +
            " element is " +
            object.min;
          //ALLOWED

          if (elemntsFound === 0) restrictionResponse.state = "ALLOWED";
        }
      });

      if (elemntsFound === 0) {
        restrictionResponse.state = "ALLOWED";
        message !== restrictionResponse.message
          ? (restrictionResponse.message = message)
          : (restrictionResponse.message = "");
      }

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Quantity element restriction applied successfully";
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
        "quantityElementRestriction_" + utils.generateId();
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };
}
