export class Restriction {
  name: string;
  config: JSON;

  constructor(name: string, config: JSON) {
    this.name = name;
    this.config = config;
  }
}
