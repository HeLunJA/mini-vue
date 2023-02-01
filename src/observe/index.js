import { ArrayMethods } from "./arr";

export function observer(data) {
  // 判断data是不是object类型或者为null的时候不做处理直接返回
  if (typeof data != "object" || data == null) {
    return data;
  }
  return new Observer(data);
}
class Observer {
  constructor(value) {
    Object.defineProperty(value, "__ob__", {
      enumerable: false,
      value: this,
    });
    // 判断value
    if (Array.isArray(value)) {
      value.__proto__ = ArrayMethods;
      // 如果数组中的元素是对象
      this.observerArray(value);
    } else {
      this.walk(value); // 处理对象，遍历对象的属性
    }
  }
  walk(data) {
    let keys = Object.keys(data);
    // 遍历keys
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      // 对属性进行劫持
      defineReactive(data, key, value);
    }
  }
  observerArray(value) {
    for (let i = 0; i < value.length; i++) {
      observer(value[i]);
    }
  }
}
function defineReactive(data, key, value) {
  // 递归劫持深层次对象属性,深度劫持
  observer(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue == value) return;
      observer(newValue); // 如果修改的值是对象，就需要对这个对象里面的值进行劫持
      value = newValue;
    },
  });
}
// 因为Object.defineProperty只能对对象中的一个属性进行劫持
// 所以需要对data对象进行遍历，劫持data的所有属性
// 如果这个被劫持的属性的值是对象的话，需要再次递归这个深层对象进行劫持
// 如果劫持后的属性被修改为一个对象的话，也需要对这个对象进行递归劫持
