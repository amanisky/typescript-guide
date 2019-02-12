interface LabelledValue {
  label: string;
  // 可选属性
  color?: string;
  // 只读属性
  readonly text: string
}

function printLabel(labelledObj: LabelledValue) {
  // 不能修改 text 属性，因为它是只读的
  // labelledObj.text = 123
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: 'this is a label', text: 'this is a text'};
printLabel(myObj);

/**
 * 只读数组
 */
let ro: ReadonlyArray<number> = [1, 2, 3, 4];
// 类型"ReadonlyArray<number>"上不存在属性“push”。
// ro.push(5);
let arr1: Array<number> = ro as number[];
arr1.push(1);

/**
 * 可选属性
 */
interface SquareConfig {
  color?: string;
  width?: number;
}

/**
 * 对象字面量的额外属性检查
 */
// 将对象字面量赋值给变量会做额外属性检查，如果对象字面量存在任何"目标类型"不包含的属性时，会报错
// a 不在类型 SquareConfig 中
// let squareConfig: SquareConfig = { a: 1, width: 100 };
// 方法一：绕开这些检查非常简单，最简便的方法是使用类型断言
// let squareConfig: SquareConfig = { a: 1, width: 100 } as SquareConfig;
// 方法二：将对象字面量赋值给另一个变量，通过这个变量进行赋值或传递
let other1 = { a: 1, width: 100 }
let squareConfig: SquareConfig = other1;

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    // 如果不小心将 color 属性写成了 clor，可以捕获引用了不存在的属性时的错误
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

// 将对象字面量作为参数传递会做额外属性检查，如果对象字面量存在任何"目标类型"不包含的属性时，会报错
// b 不在类型 SquareConfig 中
// let mySquare = createSquare({ b: 2, width: 200 });
// 绕开这些检查非常简单，最简便的方法是使用类型断言
let mySquare = createSquare({ b: 2, width: 200 } as SquareConfig);

/**
 * 函数类型
 * 为了使用接口描述函数类型，需要给接口定义一个调用签名
 */
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 创建一个函数类型变量，并将一个同类型的函数赋值给这个变量
let mySearch: SearchFunc = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

/**
 * 可索引类型
 * 定义的 StringArray 接口，它具有索引签名
 * 这个索引签名表示了当用 number 去索引 StringArray 时会得到 string 类型的返回值
 * 可以将索引设置为只读，防止了给索引赋值
 */
interface StringArray {
  readonly [index: number]: string;  
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
// 类型 StringArray 中的索引签名仅允许读取。
// myArray[1] = "hello";

interface Dictionary {
  [index: string]: string,
  [index: number]: string
};

let myObj1: Dictionary = {
  1: '很好',
  '2': '非常好',
  a: '163',
  b: 'qq'
};

console.log(myObj1["1"])
console.log(myObj1[2])
console.log(myObj1.a)
console.log(myObj1['b'])

/**
 * 类类型
 * 通过 implements 关键字实现接口
 */
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

/**
 * 继承接口
 */
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{}; // 或 let square = {} as Square;
// 上一行代码使用了类型断言，否则 square.color 会报类型 {} 上不存在 color 属性
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

let otherSquare: Square = {
  color: 'red',
  penWidth: 8,
  sideLength: 2
}

/**
 * 混合类型
 * 一个对象可以同时做为函数和对象使用，并带有额外的属性
 * 在使用 JavaScript 第三方库的时候，你可能需要像下面那样去完整地定义类型
 */
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

/**
 * 接口继承类
 */
class Control {
  private state: any;
}

// SelectableControl 包含了 Control 的所有成员，包括私有成员state
// 因为 state 是私有成员，所以只能够是 Control 的子类们才能实现 SelectableControl 接口
// 因为只有 Control 的子类才能够拥有一个声明于 Control 的私有成员 sstate，这对私有成员的兼容性是必需的
interface SelectableControl extends Control {
  select(): void;
}

// 接口同样会继承到类的 private 和 protected 成员，
// 这意味着当创建了一个接口继承了一个拥有私有或受保护的成员的类时，
// 这个接口类型只能被这个类或其子类所实现（implement）
class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  other(): void {}
}