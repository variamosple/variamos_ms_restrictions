"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageSchema = exports.Language = void 0;
class Language {
    constructor(id, name, abstractSyntax, concreteSyntax, type, stateAccept) {
        this.id = id;
        this.name = name;
        this.abstractSyntax = abstractSyntax;
        this.concreteSyntax = concreteSyntax;
        this.type = type;
        this.stateAccept = stateAccept;
    }
}
exports.Language = Language;
exports.LanguageSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        abstractSyntax: { type: "object" },
        concreteSyntax: { type: "object" },
        type: { type: "string" },
        stateAccept: { type: "string" },
    },
    required: ["name", "abstractSyntax", "concreteSyntax", "type"],
    additionalProperties: false,
};
