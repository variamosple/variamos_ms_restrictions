import { Relationship } from "./Relationship";
import { Element } from "./Element";

export class Model {
  id?: string;
  name?: string;
  type?: string;
  elements: Element[] = [];
  relationships: Relationship[] = [];
  typeEngineering?: string;

  constructor(
    id?: string,
    name?: string,
    type?: string,
    elements: Element[] = [],
    relationships: Relationship[] = [],
    typeEngineering?: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.elements = elements;
    this.relationships = relationships;
    this.typeEngineering = typeEngineering;
  }
}

export const ModelSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    elements: { type: "array" },
    relationships: { type: "array" },
    typeEngineering: { type: "string" },
    constraints: { type: "string" }
  },
  // required: ["name", "abstractSyntax", "concreteSyntax", "type"],
  additionalProperties: false,
};
