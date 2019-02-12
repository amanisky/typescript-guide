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

/**
 * readonly 修饰符
 */
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor (theName: string) {
      this.name = theName;
  }
}

let dad = new Octopus("Man with the 8 strong legs");

/**
 * 参数属性
 * 可以方便地让我们在一个地方定义并初始化一个成员
 * 通过给构造函数参数前面添加一个访问限定符来声明
 */
class People {
  readonly numberOfLegs: number = 8;

  // 把声明和赋值合并至一处
  constructor (
    readonly name: string,
    public age: number
  ) {

  }
}

let people = new People("jack", 20);

/**
 * 存储器
 */
let passcode = "secret passcode";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
        this._fullName = newName;
    }
    else {
        console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";