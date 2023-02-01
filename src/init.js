import { compileToFunction } from "./compile/index.js";
import { initState } from "./initState";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this; // 获取Vue的实例
    vm.$options = options;
    // 初始化状态
    initState(vm);
    // 渲染模板,判断实例上有没有el
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
  // 创建$mount
  Vue.prototype.$mount = function (el) {
    let vm = this;
    let options = vm.$options;
    if (!options.render) {
      // 判断实例上有没有render函数
      //如果没有render函数的话判断有没有template模板，过过没有template的话使用el的元素
      let template = options.template;
      el = document.querySelector(el); // 获取元素
      if (!template && el) {
        // 获取html
        el = el.outerHTML;
        //将el转换为ast语法树
        let ast = compileToFunction(el)
      }
    }
  };
}
