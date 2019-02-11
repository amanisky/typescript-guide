// 布尔值
let isDone: boolean = false;

// 十进制数值
let decLiteral: number = 6;

// 十六进制数值
let hexLiteral: number = 0xf00d;

// 二进制数值
let binaryLiteral: number = 0b1010;

// 八进制数值
let octalLiteral: number = 0o744;

// 字符串，使用双引号（ "）
let username: string = "bob";

// 字符串，使用单引号（'）
let password: string = 'hello';

// 字符串，使用模版字符串，并且以 ${ expr } 这种形式嵌入表达式
let sentence: string = `Hello, my name is ${ username }`;

// 数组，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组
let list: number[] = [1, 2, 3];

// 数组泛型：Array<元素类型>
let numbers: Array<number> = [1, 2, 3];

/**
 * 元组 Tuple
 * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
 */
let x: [string, number] = ['a', 1];

/**
 * 枚举 Enum
 * 枚举类型是对 JavaScript 标准数据类型的一个补充
 * 默认情况下，从0开始为元素编号；也可以手动的指定成员的数值：
 * enum Color {Red = 1, Green = 2, Blue = 4}
 * 枚举类型提供的一个便利：可以由枚举的值得到它的名字
 */
enum Color {Red, Green, Blue}
let fontColor: Color = Color.Green;
let colorName: string = Color[1]; // output：Green

/**
 * Any
 * 想为在编程阶段还不清楚类型的变量指定一个类型，可以使用 any 类型来标记这些变量
 */
let notSure: any = 4;
notSure = 'hello';
notSure = false;

// 数组包含了不同的类型的数据
let arr: any[] = [1, true, "free"];

/**
 * Void
 * 表示没有任何类型
 * 当一个函数没有返回值时，通常会见到其返回值类型是 void
 */
function warning(): void {
  console.log("This is my warning message");
}

// 声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null
let unusable: void = undefined;

/**
 * Null 和 Undefined
 * 默认情况下 null 和 undefined 是所有类型的子类型
 * 就是说可以把 null 和 undefined 赋值给 number 类型的变量
 * 当指定了--strictNullChecks 标记，null 和undefined 只能赋值给 void 和它们各自
 */
let u: undefined = undefined;
let n: null = null;

// 当指定了--strictNullChecks 标记，会报错：Type 'null' is not assignable to type 'number'.
// let num: number = null;

/**
 * Never
 * 表示的是那些永不存在的值的类型
 * never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
 * 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时
 */
function error(message: string): never {
  throw new Error(message);
}

/**
 * Object
 * 表示非原始类型
 */
declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK

/**
 * 类型断言
 * 通过类型断言这种方式可以告诉编译器，"相信我，我知道自己在干什么"
 * 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构
 * 它没有运行时的影响，只是在编译阶段起作用
 * TypeScript 会假设你已经进行了必须的检查
 */
// 尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法；使用 JSX 时，只有 as 语法断言是被允许的
let str: any = "this is a string";
let len: number = (someValue as string).length;