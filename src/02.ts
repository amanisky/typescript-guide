/**
 * var 声明
 * 可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问
 * 多次声明同一个变量并不会报错
 * 捕获变量怪异之处
 */

// 通过 var 关键字定义 JavaScript 变量
var a = 10;

// 可以在函数内部定义变量
function msg() {
  var message = "Hello, world!";
  return message;
}

/**
 * 可以在其它函数内部访问相同的变量
 * 下面的例子中
 * g 可以获取到 f 函数里定义的 a 变量
 * 每当 g 被调用时，它都可以访问到 f 里的 a 变量
 * 即使当 g 在 f 已经执行完后才被调用，它仍然可以访问及修改 a
 */
function f() {
  var a = 1;
  a = 2;
  var b = g();
  a = 3;
  
  return b;

  function g() {
    return a;
  }
}

f(); // output：2

// 捕获变量怪异之处
// for 循环结束后，i 的值为 10；所以当函数被调用的时候，它会打印出 10
for (var i = 0; i < 10; i++) {
  setTimeout(function() { console.log(i); }, 100 * i);
}

// 使用立即执行的函数表达式（IIFE）来捕获每次迭代时i的值
for (var i = 0; i < 10; i++) {
  // 通过调用具有当前值的函数来捕获 i 的当前值
  // 参数 i 会覆盖 for 循环里的 i
  (function(i) {
    setTimeout(function() { console.log(i); }, 100 * i);
  })(i);
}

/**
 * let 声明
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let
 * 当用 let 声明一个变量，它使用的是词法作用域或块作用域
 * 在同一个作用域中用 let 重复定义一个变量将引起 TypeError
 * 块作用域变量在包含它们的块或 for 循环之外是不能访问的
 * 拥有块级作用域的变量不能在被声明之前读或写，声明它的代码之前的区域都属于暂时性死区
 */

// 可以在一个拥有块作用域变量被声明前获取它，只是不能在变量声明前去调用那个函数
function foo() {
  // 可以捕获 num1
  return num1;
}

// 不能在 'num1' 被声明前调用 'foo'；运行时会抛出错误
foo();

let num1: number;

// 当 let 声明出现在循环体里时拥有完全不同的行为，不仅是在循环里引入了一个新的变量环境，而是针对每次迭代都会创建这样一个新作用域
for (let i = 0; i < 10 ; i++) {
  setTimeout(function() {console.log(i); }, 100 * i);
}

/**
 * 块级作用域变量的获取
 * 每次进入一个作用域时，它创建了一个变量的环境，就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在
 * 因为已经在 city 的环境里获取到了 city，所以就算 if 语句执行结束后仍然可以访问它
 */
function theCityThatAlwaysSleeps() {
  let getCity;

  if (true) {
    let city = "Seattle";
    getCity = function() {
      return city;
    }
  }

  return getCity();
}

/**
 * const 声明
 * 声明时必须给初始值并且被赋值后不能再改变
 * const 声明的变量，它们引用的值是不可变的
 */
const numLivesForCat = 9;
const kitty = {
  name: "Aurora",
  numLives: numLivesForCat,
}
// const 变量的内部状态是可修改的
// TypeScript 允许将对象的成员设置成只读的
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;

/**
 * 解构
 */

// 解构数组
let [first, second] = [1, 2];

// 交换变量
let str1 = "aa", str2 = "bb";
[str1, str2] = [str2, str1];

// 作用于函数参数
function fn2([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}

fn2([10, 20]);

// 可以在数组里使用...语法创建剩余变量
let [start, ...rest] = [1, 2, 3, 4];
console.log(start); // output: 1
console.log(rest); // output: [2, 3, 4]

// 可以忽略不关心的尾随元素
let [one] = [1, 2, 3, 4];
let [, two, , four] = [1, 2, 3, 4];

// 解构对象；可以在对象里使用...语法创建剩余变量
let o = {
  account: "foo",
  age: 12,
  height: "168cm",
  weight: "60kg"
};
let { account, age, ...passthrough } = o;

// 属性重命名
let { account: xm, height: sg, weight: tz } = o

// 指定类型
let {color, size}: {color: string, size: number} = { color: 'red', size: 20 };

// 默认值：可以让你在属性为 undefined 时使用缺省值
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 100 } = wholeObject;
}

// 函数声明
type C = { a: string, b?: number }

function fn3({ a, b = 1 }: C): void {
  // ...
}

/**
 * 如果函数 ajax 的第二个参数是一个对象，就可以为它的三个属性设置默认值
 * 这种写法不能省略第二个参数
 */
function ajax(url: string, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}

ajax('http://example.com', {})

/**
 * 下面的代码中：使用了双重默认值
 * 函数 fetch 没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量 method 才会取到默认值 GET
 */
function get(url: string, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(url, method);
}

get('http://example.com')

/**
 * 下面两种写法都对函数的参数设定了默认值
 * 区别是：
 * 写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值
 * 写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值
 */

// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

/**
 * 展开
 */
let defaults = { food: "spicy", price: "$", ambiance: "noisy" };
let search = { food: "rich", ...defaults };

class Cat {
  p = 12;
  m() {
  }
}
let cat = new Cat();
let clone = { ...cat };
clone.p; // ok
// 当展开一个对象实例时，会丢失其方法
// clone.m(); // error!