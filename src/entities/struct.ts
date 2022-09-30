import { Atom } from './atom';

export class Struct {
  public atoms: Map<number, Atom>;
  constructor(struct?: Struct) {
    this.atoms = new Map();
    if (struct) {
      this.atoms = struct.atoms;
    }
  }
}
