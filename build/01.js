var isDone = false;
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
var username = "bob";
var password = 'abcdef';
var sentence = "Hello, my name is " + username;
var list = [1, 2, 3];
var numbers = [1, 2, 3];
var x = ['a', 1];
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var fontColor = Color.Green;
var colorName = Color[1];
var notSure = 4;
notSure = 'hello';
notSure = false;
var arr = [1, true, "free"];
function warning() {
    console.log("This is my warning message");
}
var unusable = undefined;
var u = undefined;
var n = null;
var nu = null;
