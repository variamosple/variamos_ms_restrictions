export class ExternalFuntion {
  id: number;
  name: string;
  label: string;
  url: string;
  request: object;
  language_id: number;

  constructor(
    id: number,
    name: string,
    label: string,
    url: string,
    request: object,
    language_id: number
  ) {
    this.id = id;
    this.name = name;
    this.label = label;
    this.url = url;
    this.request = request;
    this.language_id = language_id;
  }
}

export const ExternalFunctionSchema = {
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
