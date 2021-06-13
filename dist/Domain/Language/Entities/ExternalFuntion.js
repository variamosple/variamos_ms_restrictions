"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalFunctionSchema = exports.ExternalFuntion = void 0;
class ExternalFuntion {
    constructor(id, name, label, url, request, language_id) {
        this.id = id;
        this.name = name;
        this.label = label;
        this.url = url;
        this.request = request;
        this.language_id = language_id;
    }
}
exports.ExternalFuntion = ExternalFuntion;
exports.ExternalFunctionSchema = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" },
        label: { type: "string" },
        url: { type: "string" },
        request: { type: "object" },
        language_id: { type: "number" },
    },
    required: ["name", "label", "url", "language_id"],
    additionalProperties: false,
};
