"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalFunctionSchema = exports.ExternalFuntion = void 0;
class ExternalFuntion {
    constructor(id, name, label, url, method, header, resulting_action, language_id) {
        this.id = id;
        this.name = name;
        this.label = label;
        this.url = url;
        this.method = method;
        this.header = header;
        this.resulting_action = resulting_action;
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
        method: { type: "string" },
        header: { type: "object" },
        request: { type: "object" },
        resulting_action: { type: "string" },
        language_id: { type: "number" },
    },
    required: ["name", "label", "url", "language_id"],
    additionalProperties: false,
};
