export class Language {
  id?: number;
  name?: string;
  abstractSyntax?: JSON;
  concreteSyntax?: JSON;
  type?: string;
  stateAccept?: string;

  constructor(
    id?: number,
    name?: string,
    abstractSyntax?: JSON,
    concreteSyntax?: JSON,
    type?: string,
    stateAccept?: string
  ) {
    this.id = id;
    this.name = name;
    this.abstractSyntax = abstractSyntax;
    this.concreteSyntax = concreteSyntax;
    this.type = type;
    this.stateAccept = stateAccept;
  }
}

export const LanguageSchema = {
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
