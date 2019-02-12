/**
 * 声明一个 Greeter 类，有3个成员
 * greeting 属性
 * 构造函数
 * greet 方法
 */
class Greeter {
  greeting: string;

  // this 表示访问的是类的成员
  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

/**
 * 继承
 * 使用继承来扩展现有的类
 */
// 基类
class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// 派生类包含了一个构造函数，它必须调用 super()，它会执行基类的构造函数
// 在构造函数里访问 this 的属性之前，一定要调用 super()
class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);