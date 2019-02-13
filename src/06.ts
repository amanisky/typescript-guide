/**
 * 使用泛型定义函数
 */
function identity<T>(arg: T): T {
  return arg;
}

function loggingIdentity1<T>(arg: T[]): T[] {
  // 因为数组有 length 属性，因此不会有错误
  console.log(arr.length);
  return arg;
}

function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arr.length);
  return arg;
}

/**
 * 泛型类型
 */
let myIdentity1: <T>(arg: T) => T = identity;

// 可以使用不同的泛型参数名，只要在数量上和使用方式上对应上就可以
let myIdentity2: <U>(arg: U) => U = identity;

// 可以使用带有调用签名的对象字面量来定义泛型函数
let myIdentity3: {<T>(arg: T): T} = identity;

/**
 * 定义泛型接口
 */
interface GenericIdentityFn {
  <T>(arg: T): T;
}

let myIdentity: GenericIdentityFn = identity;

/**
 * 泛型类
 * 直接把泛型类型放在类后面
 */
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T
}

let myGenericNumber1 = new GenericNumber<number>();
myGenericNumber1.zeroValue = 0;
myGenericNumber1.add = function(x, y) { return x + y; };

/**
 * 泛型约束
 */
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  // 由于编译器知道有 length 属性了，因此不会报错
  console.log(arg.length);
  return arg;
}

// 报错，数字 3 没有 length 属性
// loggingIdentity(3);

loggingIdentity("hello");

// 需要传入符合约束类型的值，必须包含必须的属性
loggingIdentity({length: 10, value: 3});

/**
 * 在泛型约束中使用类型参数
 */
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let param = { a: 1, b: 2, c: 3, d: 4 };

getProperty(param, "a")

// 错误：类型"m"的参数不能赋给类型 "a" | "b" | "c" | "d" 的参数
// getProperty(param, "m")

/**
 * 在泛型里使用类类型
 * 在 TypeScritp 使用泛型创建工厂函数时，需要引用构造函数的类类型
 */
function create<T>(c: { new(): T }): T {
  return new c();
}

class Student {}

let student = create<Student>(Student);

/**
 * 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系
 */
// 养蜂人
class BeeKeeper {
  hasMask: boolean;
}

// 动物园管理员
class ZooKeeper {
  nametag: string;
}

// 动物
class Animals {
  numLegs: number;
}

// 蜜蜂
class Bee extends Animals {
  keeper: BeeKeeper;
}

// 狮子
class Lion extends Animals {
  keeper: ZooKeeper
}

function createInstance<A extends Animals>(c: new() => A): A {
  return new c();
}

// 类型推断
let lion = createInstance(Lion)
let zooKeeper = new ZooKeeper()
zooKeeper.nametag = 'jack'
lion.keeper = zooKeeper;
console.log(lion.keeper.nametag); // output：jack

let bee = createInstance(Bee);
let beeKeeper = new BeeKeeper();
beeKeeper.hasMask = true;
bee.keeper = beeKeeper;
console.log(bee.keeper.hasMask); // output：true