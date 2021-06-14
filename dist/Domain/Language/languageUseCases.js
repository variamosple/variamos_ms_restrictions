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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const VariamosDB_1 = require("../../DataProviders/dataBase/VariamosDB");
const request_1 = require("../Init/entities/request");
const response_1 = require("../Init/entities/response");
const Language_1 = require("./Entities/Language");
const ajv = new ajv_1.default();
class LanguageManagement {
    constructor() {
        this.getExternalFuntions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield VariamosDB_1.pool.query("SELECT external_function.id, external_function.name, external_function.label, external_function.url, external_function.language_id, external_function.method, external_function.header,external_function.resulting_action FROM variamos.external_function INNER JOIN variamos.language ON variamos.external_function.language_id = variamos.language.id WHERE variamos.language.name='" +
                    req.params.languageName +
                    "'");
                const responseApi = new response_1.ResponseAPISuccess();
                responseApi.message = "External functions were found successfully";
                responseApi.data = JSON.parse(JSON.stringify(response.rows));
                responseApi.transactionId = "getExternalFuntions_";
                return res.status(200).json(responseApi);
            }
            catch (e) {
                const responseApi = new response_1.ResponseAPIError();
                responseApi.message = "Internal Server Error";
                responseApi.errorCode = "08";
                responseApi.data = JSON.parse(JSON.stringify("{ messageError: " + e + " }"));
                responseApi.transactionId = "getExternalFuntions_";
                return res.status(500).json(responseApi);
            }
        });
        this.getDetailLanguages = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield VariamosDB_1.pool.query("SELECT * FROM variamos.language");
                const responseApi = new response_1.ResponseAPISuccess();
                responseApi.message = "Language were found successfully";
                responseApi.data = JSON.parse(JSON.stringify(response.rows));
                responseApi.transactionId = "getDetailLanguages_";
                return res.status(200).json(responseApi);
            }
            catch (e) {
                const responseApi = new response_1.ResponseAPIError();
                responseApi.message = "Internal Server Error";
                responseApi.errorCode = "03";
                responseApi.data = JSON.parse(JSON.stringify("{ messageError: " + e + " }"));
                responseApi.transactionId = "getDetailLanguages_";
                return res.status(500).json(responseApi);
            }
        });
        this.getDetailLanguageByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield VariamosDB_1.pool.query("SELECT * FROM variamos.language WHERE type=upper('" +
                    req.params.type +
                    "')");
                const responseApi = new response_1.ResponseAPISuccess();
                responseApi.message = "Language were found successfully";
                responseApi.data = JSON.parse(JSON.stringify(response.rows));
                responseApi.transactionId = "getDetailLanguageByType_";
                return res.status(200).json(responseApi);
            }
            catch (e) {
                const responseApi = new response_1.ResponseAPIError();
                responseApi.message = "Internal Server Error";
                responseApi.errorCode = "04";
                responseApi.data = JSON.parse(JSON.stringify("{ messageError: " + e + " }"));
                responseApi.transactionId = "getDetailLanguageByType_";
                return res.status(500).json(responseApi);
            }
        });
        this.getLanguages = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield VariamosDB_1.pool.query("SELECT id, name, type FROM variamos.language");
                const responseApi = new response_1.ResponseAPISuccess();
                responseApi.message = "Language were found successfully";
                responseApi.data = JSON.parse(JSON.stringify(response.rows));
                responseApi.transactionId = "getLanguages_";
                return res.status(200).json(responseApi);
            }
            catch (e) {
                const responseApi = new response_1.ResponseAPIError();
                responseApi.message = "Internal Server Error";
                responseApi.errorCode = "05";
                responseApi.data = JSON.parse(JSON.stringify("{ messageError: " + e + " }"));
                responseApi.transactionId = "getLanguages_";
                return res.status(500).json(responseApi);
            }
        });
        this.getLanguageByType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield VariamosDB_1.pool.query("SELECT id, name, type FROM variamos.language WHERE type=upper('" +
                    req.params.type +
                    "')");
                const responseApi = new response_1.ResponseAPISuccess();
                responseApi.message = "Language were found successfully";
                responseApi.data = JSON.parse(JSON.stringify(response.rows));
                responseApi.transactionId = "getLanguageByType_";
                return res.status(200).json(responseApi);
            }
            catch (e) {
                const responseApi = new response_1.ResponseAPIError();
                responseApi.message = "Internal Server Error";
                responseApi.errorCode = "06";
                responseApi.data = JSON.parse(JSON.stringify("{ messageError: " + e + " }"));
                responseApi.transactionId = "getLanguageByType_";
                return res.status(500).json(responseApi);
            }
        });
        this.createLanguage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let validate = ajv.compile(request_1.RequestApiSchema);
                let valid = validate(req.body);
                if (!valid)
                    throw new Error("Something wrong in request definition. Validate: " +
                        JSON.stringify(validate.errors));
                let language = new Language_1.Language();
                language = Object.assign(language, req.body.data);
                validate = ajv.compile(Language_1.LanguageSchema);
                valid = validate(req.body.data);
                if (!valid)
                    throw new Error("Something wrong in data definition. Validate: " +
                        JSON.stringify(validate.errors));
                const response = yield VariamosDB_1.pool.query('INSERT INTO variamos.language(id, name, "abstractSyntax", "concreteSyntax", type, "stateAccept") VALUES (default,  $1, $2, $3, $4, \'PENDING\');', [
                    language.name,
                    language.abstractSyntax,
                    language.concreteSyntax,
                    language.type,
                    (language.stateAccept = "PENDING"),
                ]);
                const responseApi = new response_1.ResponseAPISuccess();
                responseApi.message = "Language created successfully";
                responseApi.data = JSON.parse(JSON.stringify(language));
                responseApi.transactionId = "createLanguage_";
                return res.status(200).json(responseApi);
            }
            catch (e) {
                const responseApi = new response_1.ResponseAPIError();
                responseApi.message = "Internal Server Error";
                responseApi.errorCode = "01";
                responseApi.data = JSON.parse(JSON.stringify("{ messageError: " + e + " }"));
                responseApi.transactionId = "createLanguage_";
                return res.status(500).json(responseApi);
            }
        });
        this.updateLanguage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let language = new Language_1.Language();
                language = Object.assign(language, req.body);
                language.id = parseInt(req.params.id);
                const response = yield VariamosDB_1.pool.query('UPDATE variamos.language SET name=$1, "abstractSyntax"=$2, "concreteSyntax"=$3, type=$4, "stateAccept"=$5 WHERE id = $6', [
                    language.name,
                    language.abstractSyntax,
                    language.concreteSyntax,
                    language.type,
                    language.stateAccept,
                    language.id,
                ]);
                const responseApi = new response_1.ResponseAPISuccess();
                responseApi.message = "Language updated successfully";
                responseApi.data = JSON.parse(JSON.stringify(language));
                responseApi.transactionId = "updateLanguage_";
                return res.status(200).json(responseApi);
            }
            catch (e) {
                const responseApi = new response_1.ResponseAPIError();
                responseApi.message = "Internal Server Error";
                responseApi.errorCode = "02";
                responseApi.data = JSON.parse(JSON.stringify("{ messageError: " + e + " }"));
                responseApi.transactionId = "updateLanguage_";
                return res.status(500).json(responseApi);
            }
        });
        this.deleteLanguage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const response = yield VariamosDB_1.pool.query("DELETE FROM variamos.language WHERE id= $1;", [id]);
                const responseApi = new response_1.ResponseAPISuccess();
                responseApi.message = "Language deleted successfully";
                responseApi.transactionId = "deleteLanguage_";
                return res.status(200).json(responseApi);
            }
            catch (e) {
                const responseApi = new response_1.ResponseAPIError();
                responseApi.message = "Internal Server Error";
                responseApi.errorCode = "07";
                responseApi.data = JSON.parse(JSON.stringify("{ messageError: " + e + " }"));
                responseApi.transactionId = "deleteLanguage_";
                return res.status(500).json(responseApi);
            }
        });
    }
}
exports.default = LanguageManagement;
