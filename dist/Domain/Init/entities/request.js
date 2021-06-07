"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestApiSchema = exports.RequestAPI = void 0;
class RequestAPI {
    constructor(transactionId, data) {
        this.transactionId = transactionId;
        this.data = data;
    }
}
exports.RequestAPI = RequestAPI;
exports.RequestApiSchema = {
    type: "object",
    properties: {
        transactionId: { type: "string" },
        data: { type: "object" },
    },
    required: ["transactionId", "data"],
    additionalProperties: false,
};
