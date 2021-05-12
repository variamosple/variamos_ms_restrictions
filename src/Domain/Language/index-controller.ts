import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../../DataProviders/dataBase/VariamosDB";

export default class LanguageManagement {
  getDetailLanguages = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        'SELECT * FROM "Variamos"."languageRegistry"'
      );
      console.log(response.rows);
      return res.status(200).json(response.rows);
    } catch (e) {
      return res.status(500).json("Internal Server Error " + e);
    }
  };

  getDetailLanguageByType = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      console.log(req.params.type);
      const response: QueryResult = await pool.query(
        'SELECT * FROM "Variamos"."languageRegistry" WHERE type=upper(\'' +
          req.params.type +
          "')"
      );
      return res.status(200).json(response.rows);
    } catch (e) {
      return res.status(500).json("Internal Server Error " + e);
    }
  };

  getLanguages = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        'SELECT id, name, type FROM "Variamos"."languageRegistry"'
      );
      console.log(response.rows);
      return res.status(200).json(response.rows);
    } catch (e) {
      return res.status(500).json("Internal Server Error " + e);
    }
  };

  getLanguageByType = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      console.log(req.params.type);
      const response: QueryResult = await pool.query(
        'SELECT id, name, type FROM "Variamos"."languageRegistry" WHERE type=upper(\'' +
          req.params.type +
          "')"
      );
      return res.status(200).json(response.rows);
    } catch (e) {
      return res.status(500).json("Internal Server Error " + e);
    }
  };
}

// export const getLanguage = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const response: QueryResult = await pool.query(
//       'SELECT * FROM "Variamos"."languageRegistry"'
//     );
//     console.log(response.rows);
//     return res.status(200).json(response.rows);
//   } catch (e) {
//     return res.status(500).json("Internal Server Error " + e);
//   }
// };

// export const getLanguageByType = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log(req.params.type);
//     const response: QueryResult = await pool.query(
//       'SELECT * FROM "Variamos"."languageRegistry" WHERE type=upper(\'' +
//         req.params.type +
//         "')"
//     );
//     return res.status(200).json(response.rows);
//   } catch (e) {
//     return res.status(500).json("Internal Server Error " + e);
//   }
// };
