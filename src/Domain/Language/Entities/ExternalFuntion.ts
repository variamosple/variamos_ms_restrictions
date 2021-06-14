export class ExternalFuntion {
  id: number;
  name: string;
  label: string;
  url: string;
  method: string;
  header: object;
  resulting_action: string;
  language_id: number;

  constructor(
    id: number,
    name: string,
    label: string,
    url: string,
    method: string,
    header: object,
    resulting_action: string,
    language_id: number
  ) {
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

export const ExternalFunctionSchema = {
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
