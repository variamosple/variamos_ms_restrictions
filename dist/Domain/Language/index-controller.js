"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const VariamosDB_1 = require("../../DataProviders/dataBase/VariamosDB");
class LanguageManagement {
    constructor() {
        this.getDetailLanguages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield VariamosDB_1.pool.query('SELECT * FROM "Variamos"."languageRegistry"');
                console.log(response.rows);
                return res.status(200).json(response.rows);
            }
            catch (e) {
                return res.status(500).json("Internal Server Error " + e);
            }
        });
        this.getDetailLanguageByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.type);
                const response = yield VariamosDB_1.pool.query('SELECT * FROM "Variamos"."languageRegistry" WHERE type=upper(\'' +
                    req.params.type +
                    "')");
                return res.status(200).json(response.rows);
            }
            catch (e) {
                return res.status(500).json("Internal Server Error " + e);
            }
        });
        this.getLanguages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield VariamosDB_1.pool.query('SELECT id, name, type FROM "Variamos"."languageRegistry"');
                console.log(response.rows);
                return res.status(200).json(response.rows);
            }
            catch (e) {
                return res.status(500).json("Internal Server Error " + e);
            }
        });
        this.getLanguageByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.type);
                const response = yield VariamosDB_1.pool.query('SELECT id, name, type FROM "Variamos"."languageRegistry" WHERE type=upper(\'' +
                    req.params.type +
                    "')");
                return res.status(200).json(response.rows);
            }
            catch (e) {
                return res.status(500).json("Internal Server Error " + e);
            }
        });
    }
}
exports.default = LanguageManagement;
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
