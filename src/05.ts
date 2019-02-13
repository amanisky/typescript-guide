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

/**
 * 箭头函数以及 this 参数
 */
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function(this: Deck) {
    // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      return {suit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);

/**
 * 重载
 */
let suits = ["hearts", "spades", "clubs", "diamonds"];

// 为同一个函数提供多个函数类型定义来进行函数重载
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };

function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}