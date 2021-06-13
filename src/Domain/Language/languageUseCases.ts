import { json, Request, Response } from "express";
import { QueryResult } from "pg";
import Ajv from "ajv";
import { pool } from "../../DataProviders/dataBase/VariamosDB";
import { RequestAPI, RequestApiSchema } from "../Init/entities/request";
import {
  ResponseAPIError,
  ResponseAPISuccess,
} from "../Init/entities/response";
import { Language, LanguageSchema } from "./Entities/Language";

const ajv = new Ajv();

export default class LanguageManagement {
  getExternalFuntions = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        "SELECT * FROM variamos.external_function WHERE language_id=" +
          req.params.type
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

      return res.status(500).json(responseApi);
    }
  };

  getDetailLanguages = async (
    _req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        "SELECT * FROM variamos.language"
      );
      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(response.rows));
      responseApi.transactionId = "getDetailLanguages_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "03";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "getDetailLanguages_";

      return res.status(500).json(responseApi);
    }
  };

  getDetailLanguageByType = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        "SELECT * FROM variamos.language WHERE type=upper('" +
          req.params.type +
          "')"
      );
      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(response.rows));
      responseApi.transactionId = "getDetailLanguageByType_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "04";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "getDetailLanguageByType_";

      return res.status(500).json(responseApi);
    }
  };

  getLanguages = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        "SELECT id, name, type FROM variamos.language"
      );

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(response.rows));
      responseApi.transactionId = "getLanguages_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "05";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "getLanguages_";

      return res.status(500).json(responseApi);
    }
  };

  getLanguageByType = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        "SELECT id, name, type FROM variamos.language WHERE type=upper('" +
          req.params.type +
          "')"
      );

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language were found successfully";
      responseApi.data = JSON.parse(JSON.stringify(response.rows));
      responseApi.transactionId = "getLanguageByType_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "06";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "getLanguageByType_";

      return res.status(500).json(responseApi);
    }
  };

  createLanguage = async (req: Request, res: Response) => {
    try {
      let validate = ajv.compile(RequestApiSchema);
      let valid = validate(req.body);

      if (!valid)
        throw new Error(
          "Something wrong in request definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      let language: Language = new Language();
      language = Object.assign(language, req.body.data);

      validate = ajv.compile(LanguageSchema);
      valid = validate(req.body.data);
      if (!valid)
        throw new Error(
          "Something wrong in data definition. Validate: " +
            JSON.stringify(validate.errors)
        );

      const response: QueryResult = await pool.query(
        'INSERT INTO variamos.language(id, name, "abstractSyntax", "concreteSyntax", type, "stateAccept") VALUES (default,  $1, $2, $3, $4, \'PENDING\');',
        [
          language.name,
          language.abstractSyntax,
          language.concreteSyntax,
          language.type,
          (language.stateAccept = "PENDING"),
        ]
      );

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language created successfully";
      responseApi.data = JSON.parse(JSON.stringify(language));
      responseApi.transactionId = "createLanguage_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "01";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "createLanguage_";

      return res.status(500).json(responseApi);
    }
  };

  updateLanguage = async (req: Request, res: Response): Promise<Response> => {
    try {
      let language: Language = new Language();

      language = Object.assign(language, req.body);
      language.id = parseInt(req.params.id);

      const response: QueryResult = await pool.query(
        'UPDATE variamos.language SET name=$1, "abstractSyntax"=$2, "concreteSyntax"=$3, type=$4, "stateAccept"=$5 WHERE id = $6',
        [
          language.name,
          language.abstractSyntax,
          language.concreteSyntax,
          language.type,
          language.stateAccept,
          language.id,
        ]
      );

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language updated successfully";
      responseApi.data = JSON.parse(JSON.stringify(language));
      responseApi.transactionId = "updateLanguage_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "02";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "updateLanguage_";

      return res.status(500).json(responseApi);
    }
  };

  deleteLanguage = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id);

      const response: QueryResult = await pool.query(
        "DELETE FROM variamos.language WHERE id= $1;",
        [id]
      );

      const responseApi = new ResponseAPISuccess();
      responseApi.message = "Language deleted successfully";
      responseApi.transactionId = "deleteLanguage_";

      return res.status(200).json(responseApi);
    } catch (e) {
      const responseApi = new ResponseAPIError();
      responseApi.message = "Internal Server Error";
      responseApi.errorCode = "07";
      responseApi.data = JSON.parse(
        JSON.stringify("{ messageError: " + e + " }")
      );
      responseApi.transactionId = "deleteLanguage_";

      return res.status(500).json(responseApi);
    }
  };
}
