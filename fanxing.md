### 介绍
+ 软件工程中，不仅要创建一致的定义良好的 API，同时也要考虑可重用性
+ 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时提供了十分灵活的功能
+ 可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据，用户就可以以自己的数据类型来使用组件

### 泛型之 Hello World
+ 创建第一个使用泛型的列子：identity 函数
+ 这个函数会返回任何传入它的值
+ 不用泛型定义函数方式一
```ts
function identity(arg: number): number {
  return arg;
}
```
+ 不用泛型定义函数方式二：使用 any 类型来定义函数
+ 使用 any 类型会导致这个函数可以接收任何类型的 arg 函数，这样就丢失了一些信息：
  + 传入的类型与返回的类型应该是相同的
  + 例如：传入一个数字，只知道任何类型的值都有可能被返回
```ts
function identity(arg: any): any {
  return arg;
}
```
+ 使用泛型的定义函数
+ 需要一种方法返回值的类型与传入的类型是相同的
+ 使用**类型变量**，它是一种特殊的变量，只用于表示类型而不是值
```ts
function identity<T>(arg: T): T {
  return arg;
}
```
+ 给 identity 函数添加了类型变量 T，T 帮助捕获用户传入的类型（例如：number），之后就可以使用这个类型
+ 使用了 T 当作参数的乐星
+ 使用了 T 当作函数返回值类型
+ 现在可以知道参数类型与返回值类型是相同的，就可以跟踪函数里使用的类型的信息
+ 定义了泛型函数后，可以用两种方法使用
  + 第一种，传入所有的参数，包含类型参数
  + 第二种方法更普遍，利用了**类型推论**--即编译器会根据传入的参数自动地帮助我们确定 T 的类型
```ts
let str1 = identity<string>("hello");
/**
 * 注意：
 * 没必要使用尖括号(<>)来明确地传入类型；
 * 编译器可以查看 world 的值，然后把 T 设置为它的类型；
 * 类型推论保持代码精简和高可读性；
 * 如果编译器不能够自动地推断出类型的话，就只能像上面那样明确的传入 T 的类型，在一些复杂情况下这是可能出现的
 */ 
let str2 = indetity('world');
```

### 使用泛型变量
+ 使用泛型船舰像 identity 这样的泛型函数时，编译器要求在函数体必须正确的使用这个通用的类型。换句话说，必须把这些参数当作是任意或所有类型
+ 之前 identity 例子
```ts
function identity<T>(arg: T): T {
  return arg;
}
```
+ 希望同时打印出 arg 的长度；可能会这么做
```ts
function loggingIdentity<T>(arg: T): T {
  // 错误：T 没有 length 属性
  console.log(arg.length);
  return arg;
}
```
+ 如果这么做，编译器会报错说使用了 arg 的 length 属性，但是没有地方指明 arg 具有这个属性
+ 记住：这些类型变量代表的是任意类型，所以使用这个函数的人可能传入的是个数字，而数字是没有 length 属性的
+ 现在假设我们想操作 T 类型的数组而不直接是 T；由于操作的是数组，所以 length 属性是存在的；定义方式如下：
```ts
function loggingIdentity<T>(arg: T[]): T[] {
  // 因为数组有 length 属性，因此不会有错误
  console.log(arr.length);
  return arg;
}
```
+ 可以这样理解 loggingIdentity 的类型：
  + 泛型函数 loggingIdentity，接收类型参数 T 和参数 arg，它是个元素类型为 T 的数组，并返回元素类型为 T 的数组
  + 如果传入数字数组，将返回一个数字数组，此时 T 的类型为 number
  + 可以把泛型变量 T 当作类型的一部分使用，而不是整个类型，增加灵活性
```ts
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arr.length);
  return arg;
}
```

### 泛型类型
+ 上面章节创建了 identity 通用函数，可以适用于不同的类型
+ 研究一下函数本身的类型，以及如何创建泛型接口
+ 泛型函数的类型与非泛型函数的类型没有什么不同，只是有一个类型参数在最前面，像函数声明一样：
```ts
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity1: <T>(arg: T) => T = identity;
// 可以使用不同的泛型参数名，只要在数量上和使用方式上对应上就可以
let myIdentity2: <U>(arg: U) => U = identity;
// 可以使用带有调用签名的对象字面量来定义泛型函数
let myIdentity3: {<T>(arg: T): T} = identity;
```
+ 定义泛型接口
```ts
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```
+ 可能想把泛型参数当作整个接口的一个参数
+ 这样就能清楚的知道使用的具体是哪个泛型类型
+ 这样接口里的其他成员也能知道这个参数的类型了
```ts
interface GenericIdentityFn<T> {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIndentity: GenericIdentityFn<number> = identity;
```
+ 注意上面的示例做了少许改动，不在描述泛型函数，而是把非泛型函数签名作为泛型类型一部分
+ 当使用 GenericIdentityFn 的时候，需要传入一个类型参数来指定泛型类型（上例是 number），锁定了之后代码里使用的类型
+ 对于描述哪部分类型（上例是 number 类型）属于泛型部分来说，理解何时把参数放在调用签名里和何时放在接口上是很有帮助的
+ 除了可以创建泛型接口，还可以创建泛型类
+ 注意：不可以创建泛型枚举和泛型命名空间

### 泛型类
+ 类有两部分：静态部分和实例部分
+ 泛型类指的是实例部分的类型，类的静态属性不能使用泛型类型
+ 泛型类使用尖括号(<>)括起泛型类型，跟在类名后面
```ts
// 直接把泛型类型放在类后面
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T
}

let myGenericNumber1 = new GenericNumber<number>();
myGenericNumber1.zeroValue = 0;
myGenericNumber1.add = function(x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "hello";
stringNumeric.add = function(x, y) { return x + y; };
console.log(stringNumeric.add(stringNumeric.zeroValue, "world"))
```

### 泛型约束
+ 有时候像操作某类型的一组值，并且知道这组值具有什么样的属性
+ 在 loggingIdentity 例子中，像访问呢 arg 的 length 属性，但是编译器并不能保证每种类型都有 length 属性，所以就报错了
+ 如果想要限制函数去处理任意带有 length 属性的所有类型，只要传入的类型有这个属性即可
+ 定义一个接口来描述约束条件，然后使用这个接口和 extends 关键字来实现约束
```ts
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  // 由于编译器知道有 length 属性了，因此不会报错
  console.log(arg.length);
  return arg;
}

// 报错，数字 3 没有 length 属性
loggingIdentity(3);

loggingIdentity("hello");

// 需要传入符合约束类型的值，必须包含必须的属性
loggingIdentity({length: 10, value: 3});
```

### 在泛型约束中使用类型参数
+ 可以声明一个类型参数，且它被另一个类型参数所约束
+ 比如：现在想要用属性名从 obj 对象里获取这个属性值，并且想要确保这个属性存在于对象 obj 上，因此需要在这两个类型之间使用约束
```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a")

// 错误：类型"m"的参数不能赋给类型 "a" | "b" | "c" | "d" 的参数
getProperty(x, "m")
```

### 在泛型里使用类类型
+ 在 TypeScritp 使用泛型创建工厂函数时，需要引用构造函数的类类型
```ts
function create<T>(c: {new(): T; }): T {
  return new c();
}
```
+ 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系
```ts
// 养蜂人
class Beekeeper {
  hasMask: boolean;
}

// 动物园管理员
class ZooKeeper {
  nametag: string;
}

// 动物
class Animal {
  numLegs: number;
}

// 蜜蜂
class Bee extends Animal {
  keeper: BeeKeeper;
}

// 狮子
class Lion extends Animal {
  keepter: ZooKeeper
}

function createInstance<A extends Animal>(c: new() => A): A {
  return new c();
}

// 类型推断
createInstance(Lion).keeper.nametag;

createInstance(Bee).keeper.hasMask;
```