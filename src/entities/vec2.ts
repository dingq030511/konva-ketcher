function isNum(n: any): n is number {
  return typeof n === 'number';
}

export interface Vec2Like {
  x: number;
  y: number;
}
export class Vec2 {
  public x: number;
  public y: number;
  private observers?: Array<Function>;
  constructor(v: Vec2);
  constructor(v: [x: number, y: number]);
  constructor(v: Vec2Like);
  constructor(x: number, y: number);
  constructor(...args: Array<any>) {
    let x = 0;
    let y = 0;
    if (args.length === 0) {
      x = 0;
      y = 0;
    } else if (args.length === 1) {
      if (Array.isArray(args[0])) {
        x = args[0][0];
        y = args[0][1];
      } else if (args[0] && typeof args[0] === 'object') {
        x = args[0].x;
        y = args[0].y;
      } else {
        x = args[0];
        y = args[0];
      }
    } else {
      x = args[0];
      y = args[1];
    }
    this.x = Vec2.clean(x);
    this.y = Vec2.clean(y);
  }
  static precision = 8;
  static clean(val: number) {
    if (Number.isNaN(val)) {
      throw new Error('NaN detected');
    }
    if (!isFinite(val)) {
      throw new Error('Infinity detected');
    }
    if (Math.round(val) === val) {
      return val;
    }
    return Math.round(val * Vec2.precision) / Vec2.precision;
  }

  static fromArray(v: [x: number, y: number]) {
    return new Vec2(v[0], v[1]);
  }
  private setOrReturnNewVec(x: number, y: number, returnNew?: boolean) {
    if (returnNew) {
      return new Vec2(x, y);
    } else {
      return this.set(x, y);
    }
  }
  public change(fn: Function | any) {
    if (typeof fn === 'function') {
      if (this.observers) {
        this.observers.push(fn);
      } else {
        this.observers = [fn];
      }
    } else if (this.observers && this.observers.length) {
      this.observers
        .slice()
        .reverse()
        .forEach(ob => {
          ob(this, fn);
        });
    }
    return this;
  }
  public ignore(fn: Function) {
    if (this.observers) {
      if (!fn) {
        this.observers = [];
      } else {
        const o = this.observers;
        let l = o.length;
        while (l--) {
          o[l] === fn && o.splice(l, 1);
        }
      }
    }
    return this;
  }

  public set(v: Vec2): Vec2;
  public set(v: Vec2, notify: boolean): Vec2;
  public set(x: number, y: number): Vec2;
  public set(x: number, y: number, notify: boolean): Vec2;
  public set(x: number | Vec2Like, y?: number | boolean, notify = true) {
    if (!isNum(x)) {
      notify = y === false ? false : true;
      y = x.y;
      x = x.x;
    }
    if (this.x === x && this.y === y) {
      return this;
    }
    let orig: Vec2;
    if (notify && this.observers && this.observers.length) {
      orig = this.clone();
    }
    this.x = Vec2.clean(x);
    this.y = Vec2.clean(y as number);
    if (notify) {
      return this.change(orig!);
    }
    return this;
  }

  public clone() {
    return new Vec2(this);
  }

  public zero() {
    return this.set(0, 0);
  }

  public negate(retrunNew: boolean) {
    if (retrunNew) {
      return new Vec2(-this.x, -this.y);
    } else {
      return this.set(-this.x, -this.y);
    }
  }

  public add(v: [x: number, y: number], returnNew?: boolean): Vec2;
  public add(v: Vec2Like, returnNew?: boolean): Vec2;
  public add(x: number, y: number, returnNew?: boolean): Vec2;
  public add(x: number | number[] | Vec2Like, y?: number | boolean, returnNew?: boolean): Vec2 {
    if (!isNum(x)) {
      returnNew = y as boolean;
      if (Array.isArray(x)) {
        y = x[1];
        x = x[0];
      } else {
        y = x.y;
        x = x.x;
      }
    }
    x += this.x;
    let _y: number = <number>y + this.y;
    return this.setOrReturnNewVec(x, _y, returnNew);
  }

  public substract(v: [x: number, y: number], returnNew?: boolean): Vec2;
  public substract(v: Vec2Like, returnNew?: boolean): Vec2;
  public substract(x: number, y: number, returnNew?: boolean): Vec2;
  public substract(x: number | number[] | Vec2Like, y?: number | boolean, returnNew?: boolean): Vec2 {
    if (!isNum(x)) {
      returnNew = y as boolean;
      if (Array.isArray(x)) {
        y = x[1];
        x = x[0];
      } else {
        y = x.y;
        x = x.x;
      }
    }
    x = this.x - x;
    let _y: number = this.y - <number>y;
    return this.setOrReturnNewVec(x, _y, returnNew);
  }

  public multiply(v: Vec2Like, returnNew?: boolean): Vec2;
  public multiply(v: [x: number, y: number], returnNew?: boolean): Vec2;
  public multiply(x: number, returnNew?: boolean): Vec2;
  public multiply(x: number, y: number, returnNew?: boolean): Vec2;
  public multiply(x: number | number[] | Vec2Like, y?: number | boolean, returnNew?: boolean): Vec2 {
    if (!isNum(x)) {
      returnNew = y as boolean;
      if (Array.isArray(x)) {
        y = x[1];
        x = x[0];
      } else {
        y = x.y;
        x = x.x;
      }
    } else if (!isNum(y)) {
      returnNew = y;
      y = x;
    }
    x = this.x * x;
    let _y: number = this.y * <number>y;
    return this.setOrReturnNewVec(x, _y, returnNew);
  }

  public rotate(r: number, inverse: boolean, returnNew?: boolean) {
    const x = this.x;
    const y = this.y;
    const cos = Math.cos(r);
    const sin = Math.sin(r);
    let rx: number;
    let ry: number;
    let inverseNum = inverse ? -1 : 1;
    rx = cos * x - inverseNum * sin * y;
    ry = inverseNum * sin * x + cos * y;
    return this.setOrReturnNewVec(rx, ry, returnNew);
  }

  public length() {
    return Math.sqrt(this.lengthSquared());
  }

  public lengthSquared() {
    const x = this.x;
    const y = this.y;
    return x * x + y * y;
  }

  public distance(v: Vec2) {
    return this.substract(v, true).length();
  }

  public nearest(others: Vec2[]) {
    let shortestDistance = Number.MAX_VALUE;
    let nearest!: Vec2;
    let currentDistance!: number;
    others.forEach(v => {
      currentDistance = this.distance(v);
      if (currentDistance <= shortestDistance) {
        shortestDistance = currentDistance;
        nearest = v;
      }
    });
    return nearest;
  }

  public normalize(returnNew?: boolean) {
    const length = this.length();
    const invertedLength = length < Number.MIN_VALUE ? 0 : 1 / length;
    const x = this.x * invertedLength;
    const y = this.y * invertedLength;
    return this.setOrReturnNewVec(x, y, returnNew);
  }

  public equal(x: number | Vec2 | number[], y?: number) {
    if (!isNum(x)) {
      if (Array.isArray(x)) {
        y = x[1];
        x = x[0];
      } else {
        y = x.y;
        x = x.x;
      }
    }
    return Vec2.clean(x) === this.x && Vec2.clean(y as number) === this.y;
  }

  public abs(returnNew?: boolean) {
    const x = Math.abs(this.x);
    const y = Math.abs(this.y);
    return this.setOrReturnNewVec(x, y, returnNew);
  }

  public min(v: Vec2, returnNew?: boolean) {
    const x = Math.min(this.x, v.x);
    const y = Math.min(this.y, v.y);
    return this.setOrReturnNewVec(x, y, returnNew);
  }

  public max(v: Vec2, returnNew?: boolean) {
    const x = Math.max(this.x, v.x);
    const y = Math.max(this.y, v.y);
    return this.setOrReturnNewVec(x, y, returnNew);
  }

  public clamp(low: Vec2, high: Vec2, returnNew?: boolean) {
    const ret = this.min(high, true).max(low);
    return this.setOrReturnNewVec(ret.x, ret.y, returnNew);
  }

  public lerp(v: Vec2, amount: number, returnNew?: boolean) {
    return this.add(v.substract(this, true).multiply(amount), returnNew);
  }

  public skew(returnNew?: boolean) {
    return this.setOrReturnNewVec(-this.y, this.x, returnNew);
  }

  /**
   * calculate the dot product between
   * this vector and the incoming
   * @param v
   * @returns
   */
  public dot(v: Vec2) {
    return Vec2.clean(this.x * v.x + this.y * v.y);
  }

  /**
   * calculate the perpendicular dot product between
   * this vector and the incoming
   * @param v
   * @returns
   */
  public perpDot(v: Vec2) {
    return Vec2.clean(this.x * v.y - this.y * v.x);
  }

  public angleTo(v: Vec2) {
    return Math.atan2(this.perpDot(v), this.dot(v));
  }

  public divide(v: Vec2Like, returnNew?: boolean): Vec2;
  public divide(v: [x: number, y: number], returnNew?: boolean): Vec2;
  public divide(x: number, returnNew?: boolean): Vec2;
  public divide(x: number, y: number, returnNew?: boolean): Vec2;
  public divide(x: number | number[] | Vec2Like, y?: number | boolean, returnNew?: boolean): Vec2 {
    if (!isNum(x)) {
      returnNew = y as boolean;
      if (Array.isArray(x)) {
        y = x[1];
        x = x[0];
      } else {
        y = x.y;
        x = x.x;
      }
    } else if (!isNum(y)) {
      returnNew = y;
      y = x;
    }
    if (x === 0 || y === 0) {
      throw new Error('division by zero');
    }
    x = this.x / Vec2.clean(x);
    let _y: number = this.y / Vec2.clean(y);
    return this.setOrReturnNewVec(x, _y, returnNew);
  }

  public isPointOnLine(start: Vec2, end: Vec2) {
    return (start.y - this.y) * (start.x - end.x) === (start.y - end.y) * (start.x - this.x);
  }

  public toArray(): [x: number, y: number] {
    return [this.x, this.y];
  }

  public fromArray(v: [x: number, y: number]) {
    return this.set(v[0], v[1]);
  }

  public toJson(): Vec2Like {
    return {
      x: this.x,
      y: this.y,
    };
  }

  public toString() {
    return `(${this.x}, ${this.y})`;
  }
}
