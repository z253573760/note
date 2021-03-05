const str: string = "123";
const num: number = 1;
const arr: (string | number)[] = ["1", "2"];

const fn: (list: (string | number)[]) => void = function (
  list: (string | number)[]
): void {
  console.log(list);
};
fn(arr);

let bar: string | number = "1";
console.log(bar);

function addName(s: string) {}

class A {
  constructor() {
    //
  }
  public name = "321";
  getName() {
    console.log("father name");
  }
  public get age() {
    return "age";
  }
}
class B extends A {
  constructor() {
    super();
  }
  name = "son";
  getName() {
    console.log("B getname", super.name);
    super.getName();

    return this.name;
  }
}

new B().getName();
