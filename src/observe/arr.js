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
    // 当使用了数组增加元素的方法添加对象后，新添加的对象也需要进行劫持
    let inserted;
    switch (item) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.splice(2);
        break;
    }
    let ob = this.__ob__;
    if (inserted) {
      ob.observerArray(inserted); // 对新添加的对象进行劫持
    }
    ob.dep.notify();
    return result;
  };
});
