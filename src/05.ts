/**
 * 函数类型
 */
function add(x: number, y: number): number {
  return x + y;
}

// 简洁函数类型
let myAdd1 = function(x: number, y: number): number { return x + y; };

// 完整函数类型
let myAdd2: (x: number, y: number) => number = function(x: number, y: number): number { 
  return x + y; 
};

/**
 * 可选参数
 */
function buildName1(firstName: string, lastName?: string) {
  
}

/**
 * 默认参数
 */
function buildName2(firstName: string, lastName: string = "Smith") {
  
}

/**
 * 剩余参数
 */
function buildName3(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");