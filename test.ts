function bar(target) {
  console.log("target", target);
  return target;
}

class Person {
  constructor() {
    //
  }
}

enum typ {
  color = 0,
}
interface P {
  speak: <T>(s: string, b: T) => T;
}

function foo<T extends { length: number }>(v: T) {
  const len = v.length;
}
