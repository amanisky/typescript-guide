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

/**
 * 静态属性
 */
class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

/**
 * 抽象类
 */
abstract class Department {

  constructor(public name: string) {
  }

  printName(): void {
      console.log('Department name: ' + this.name);
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

  constructor() {
      super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
      console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// 错误: 不能创建一个抽象类的实例
// department = new Department();
// 允许对一个抽象子类进行实例化和赋值
department = new AccountingDepartment();
department.printName();
department.printMeeting();

/**
 * 构造函数
 */
class MyGreeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let myGreeter: MyGreeter;
myGreeter = new MyGreeter("world");
console.log(myGreeter.greet());
// greeterMaker 变量保存了这个类或者说保存了类构造函数
// 使用 typeof MyGreeter，意思是取 MyGreeter 类的类型，而不是实例的类型
// 或者更确切的说，"告诉我 MyGreeter 标识符的类型"，也就是构造函数的类型
// 这个类型包含了类的所有静态成员和构造函数
let greeterMaker: typeof MyGreeter = MyGreeter;
greeterMaker.standardGreeting = "Hey there!";
let greeter2: MyGreeter = new greeterMaker("hello");
console.log(greeter2.greet());

/**
 * 把类当作接口使用
 */
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};