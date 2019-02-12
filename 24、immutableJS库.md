# immutable.js 意义何在，使用场景？
+ 它是一个完全独立的库，无论基于什么框架都可以用它
+ 意义在于它弥补了 Javascript 没有不可变数据结构的问题
+ 不可变数据结构是函数式编程中必备的

### 介绍
+ Javascript 中对象都是参考类型
+ 可变的好处是节省内存或是利用可变性做一些事情，但在复杂的开发中它的副作用远比好处大的多，于是才有了**浅拷贝**和**深拷贝**，就是为了解决这个问题

```js
var obj = { a: 1 };
var other = obj;
other.a = 10;
console.log(obj.a); // output：10
```

### jQuery 中的浅拷贝和深拷贝
```js
// 默认配置
var defaultConfig = { /* 默认值 */ }
// 浅拷贝（修改 defaultConfig）
$.extend(defaultConfig, initConfig)
// 浅拷贝（不修改 defaultConfig）
var copy = $.extend({}, defaultConfig, initConfig)
// 深拷贝（修改 defaultConfig）
$.extend(true, defaultConfig, initConfig)
// 深拷贝（不修改 defaultConfig）
var deepCopy = $.extend(true, {}, defaultConfig, initConfig)
```

### ES6 中的 assign 方法
+ 相当于浅拷贝

### ES5.1 中 freeze 方法
+ 有了不可变数据结构，但是也是浅拷贝
+ 在实际开发中浅拷贝通常不够用

```js
var obj = Object.freeze({ a: 1 });
var other = obj;
other.a = 100;
console.log(obj.a); // output：1
```

### 使用 immutableJS
```js
var defaultConfig = Immutable.fromJS({ /* 默认值 */ });
// defaultConfig 不会改变，返回新值给 copy，浅拷贝
var copy = defaultConfig.merge(initConfig); 
// defaultConfig 不会改变，返回新值给 deepCopy，深拷贝
var deepCopy = defaultConfig.mergeDeep(initConfig);
```

### immutableJS vs $.extend
+ 差别在于性能，每次深拷贝都要把整个对象递归的复制一份
+ ImmutableJS 的实现有些像链表，添加一个新结点把旧结点的父子关系转移到新结点上，性能提升很多；[持久数据结构原理](https://en.wikipedia.org/wiki/Persistent_data_structure)
+ ImmutableJS 提供了 7 种不可变的数据结构：List, Stack, Map, OrderedMap, Set, OrderedSet, Record
+ immutableJS ＋ 原生 Javascript 等于真正的函数式编程
+ immutableJS 提供了强大的 api，由于是不可变的，可以放心的对对象进行任意操作