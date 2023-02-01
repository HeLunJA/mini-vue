import { initState } from "./initState";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    console.log(options, "初始化获取到options");
    let vm = this; // 获取Vue的实例
    vm.$options = options;
    // 初始化状态
    initState(vm);
  };
}
