import { json, Request, Response } from "express";
import { QueryResult } from "pg";
import Ajv from "ajv";
import { pool } from "../../DataProviders/dataBase/VariamosDB";
import { RequestAPI, RequestApiSchema } from "../Init/entities/request";
import {
  ResponseAPIError,
  ResponseAPISuccess,
} from "../Init/entities/response";
import {
  ExternalFunctionSchema,
  ExternalFunction,
  OrmExternalFunction,
} from "./Entities/ExternalFuntion";
import { Language, OrmLanguage } from "./Entities/Language";

const ajv = new Ajv();

export default class ExternalFunctionManagement {
  getExternalFuntions = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        "SELECT external_function.id, external_function.name, external_function.label, external_function.url, external_function.language_id, external_function.method, external_function.header,external_function.resulting_action FROM variamos.external_function INNER JOIN variamos.language ON variamos.external_function.language_id = variamos.language.id WHERE variamos.language.name='" +
          req.params.languageName +
          "'"
      );
      const responseApi = new ResponseAPISuccess();
      responseApi.message = "External functions were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(response.rows));
      responseApi.transactionId = "getExternalFuntions_";
      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "08";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "getExternalFuntions_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  createExternalFunction = async (req: Request, res: Response) => {
    try {
      let validate = ajv.compile(RequestApiSchema);
      let valid = validate(req.body);

      if (!valid)
        throw new Error(
          "Something wrong in request definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      let extFunction: ExternalFunction = new ExternalFunction();
      extFunction = Object.assign(extFunction, req.body.data);

      validate = ajv.compile(ExternalFunctionSchema);
      valid = validate(req.body.data);

      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      const searchLanguage = (await OrmLanguage.findOne({
        where: { name: req.params.languageName },
      })) as Language;

      extFunction.language_id = searchLanguage.id;

      let newExFunction = await OrmExternalFunction.create(extFunction, {
        fields: [
          "name",
          "label",
          "url",
          "method",
          "header",
          "request",
          "resulting_action",
          "language_id",
        ],
      });

      if (newExFunction) {
        const responseApi = new ResponseAPISuccess();
        responseApi.message = "External function created successfully";
        responseApi.data = JSON.parse(JSON.stringify(extFunction));
        responseApi.transactionId = "createExternalFunction_";

        return res.status(200).json(responseApi);
      }
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "10";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "createExternalFunction_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  updateExternalFunction = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let validate = ajv.compile(RequestApiSchema);
      let valid = validate(req.body);

      if (!valid)
        throw new Error(
          "Something wrong in request definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      let extFunction: ExternalFunction = new ExternalFunction();
      extFunction = Object.assign(extFunction, req.body.data);
      extFunction.id = parseInt(req.params.id);

      validate = ajv.compile(ExternalFunctionSchema);
      valid = validate(req.body.data);

      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      //   const response: QueryResult = await pool.query(
      //     'UPDATE variamos.language SET name=$1, "abstractSyntax"=$2, "concreteSyntax"=$3, type=$4, "stateAccept"=$5 WHERE id = $6',
      //     [
      //       language.name,
      //       language.abstractSyntax,
      //       language.concreteSyntax,
      //       language.type,
      //       language.stateAccept,
      //       language.id,
      //     ]
      //   );

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "External function updated successfully";
      responseApi.data = JSON.parse(JSON.stringify(extFunction));
      responseApi.transactionId = "updateExternalFunction_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "02";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "updateExternalFunction_";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };

  deleteExternalFunction = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id = parseInt(req.params.id);

      const response: QueryResult = await pool.query(
        "DELETE FROM variamos.external_function WHERE id= $1;",
        [id]
      );

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "External function deleted successfully";
      responseApi.transactionId = "deleteExternalFUnction_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "15";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "deleteExternalFUnction";
      console.log(JSON.stringify(responseApi));
      return res.status(500).json(responseApi);
    }
  };
}
