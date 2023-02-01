import { observer } from "./observe/index";

export function initState(vm) {
  let ops = vm.$options;
  //   if (ops.props) {
  //     initProps();
  //   }
  //   if (ops.watch) {
  //     initWatch();
  //   }
  //   if (ops.computed) {
  //     initComputed();
  //   }
  //   if (ops.methods) {
  //     initMethods();
  //   }
  if (ops.data) {
    initData(vm);
  }
}
// function initProps() {}
// function initWatch() {}
// function initComputed() {}
// function initMethods() {}
// 对data初始化
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  // 将data中的属性代理到vm实例上
  for (let key in data) {
    Proxy(vm, "_data", key);
  }
  // 对data中的数据进行劫持
  observer(data);
}
function Proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    },
  });
}
