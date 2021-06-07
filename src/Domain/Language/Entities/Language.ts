export class Language {
  id?: number;
  name?: string;
  abstractSyntax?: JSON;
  concreteSyntax?: JSON;
  type?: string;

  constructor(
    id?: number,
    name?: string,
    abstractSyntax?: JSON,
    concreteSyntax?: JSON,
    type?: string
  ) {
    this.id = id;
    this.name = name;
    this.abstractSyntax = abstractSyntax;
    this.concreteSyntax = concreteSyntax;
    this.type = type;
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
  },
  required: ["name", "abstractSyntax", "concreteSyntax", "type"],
  additionalProperties: false,
};
