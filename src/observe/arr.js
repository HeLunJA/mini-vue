// 获取数组原型的方法
let oldArrayProtoMethods = Array.prototype;
// 继承数组原型方法
export let ArrayMethods = Object.create(oldArrayProtoMethods);
// 劫持部分数组方法
let methods = ["push", "pop", "unshift", "shift", "splice"];
methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    // 调用数组原来的方法
    let result = oldArrayProtoMethods[item].apply(this, args);
    console.log("数组劫持");
    return result;
  };
});
