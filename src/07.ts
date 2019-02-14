/**
 * 数字枚举
 * 定义一个数字枚举， Up 使用初始化为 1。 其余的成员会从 1 开始自动增长。 
 * 换句话说， Direction.Up 的值为 1， Down 为 2， Left 为 3， Right 为 4
 */
enum Dance {
  Up = 1,
  Down,
  Left,
  Right
}

/**
 * Up 的值为 0， Down 的值为 1，Left 的值为 2， Right 的值为 3
 */
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

/**
 * 使用枚举
 * 1、通过枚举的名字设置枚举类型
 * 2、通过枚举的属性来访问枚举成员
 */
function fn7(message: Direction): void {
  // ...
}

fn7(Direction.Up)

/**
 * 字符串枚举
 */
enum Game {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

/**
 * 计算的和常量成员
 */
enum FileAccess {
  // 常量成员
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = Read | Write,
  // 计算的成员
  G = "123".length
}