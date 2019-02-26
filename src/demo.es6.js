// es新特性检测

// Promise
console.log(
    new Promise((resolve, reject) => {
        console.log('promise!');
    })
);

// async & await
function sleep(time) {
    console.log(time);
}
async function count() {
    let counter = 1;
    for (let i = 0; i < 100; i++) {
        counter += 1;
        console.log(counter);
        await sleep(1000);
    }
}
count();

// Decorators
const decro = (val) => (_class) => new _class(val);
@decro('abc')
class Test {
    constructor(val) {
        this.val = val;
    }

    log() {
        console.log(this.val);
    }
}
Test.log(); // "abc"

// Map
console.log(new Map());

// 乘方
console.log('8的2次方：', 8 ** 2);

// 空格补齐
console.log('abc'.padStart(10));
console.log(`${'abc'.padEnd(6)}def`);
console.log('5'.padEnd(10, '=*')); // '5=*=*=*=*='
console.log('5'.padStart(10, '=*')); // '=*=*=*=*=5'

// Array.prototype.includes
console.log('abc'.includes('a'));

// findIndex
console.log(['babel1', 'babel'].findIndex((item) => item === 'babel'));

const ttObj = { x: 1, y: 2, z: 3, d: 4 };
// 对象的Rest&Spread
const { x, y, ...z } = ttObj;
console.log(x); // 1
console.log(z); // 输出{ z: 3, d: 4 }

const n = { x, y, ...z };
console.log(n); // 输出{x:1,y:2,z:3,d:4}

const t = ttObj;
const { x: aa, ...tt } = t;
console.log(tt);

// Object.assign
console.log(Object.assign(ttObj, { c: `${t.x}-001` }));

// Object.defineProperty
Object.defineProperty(t, 'a', {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true,
});

// Object.getOwnPropertyDescriptors
Object.getOwnPropertyDescriptors(ttObj);
/* {
 x: { value: 1, writable: true, enumerable: true, configurable: true },
  y: { value: 1, writable: true, enumerable: true, configurable: true },
  z: { value: 2, writable: true, enumerable: true, configurable: true }
} */
Object.getOwnPropertyDescriptors(ttObj, 'x');
/* { value: 1, writable: true, enumerable: true, configurable: true } */

// Object.values
Object.values(ttObj); // 输出[ 1, 2 ]
for (const value of Object.values(ttObj)) {
    console.log(value); // 1, 2
}

// Object.entries
Object.entries(ttObj); // 输出[ [ 'a', 1 ], [ 'b', 2 ] ]
for (const [key, value] of Object.entries(ttObj)) {
    console.log([key, value]); // ['a', 1], ['b', 2]
}
