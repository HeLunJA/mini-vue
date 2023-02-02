import { compileToFunction } from "./compile/index.js";
import { initState } from "./initState";
import { mounetComponent } from "./lifecycle.js";

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
    el = document.querySelector(el); // 获取元素
    vm.$el = el;
    let options = vm.$options;
    if (!options.render) {
      // 判断实例上有没有render函数
      //如果没有render函数的话判断有没有template模板，过过没有template的话使用el的元素
      let template = options.template;
      if (!template && el) {
        // 获取html
        el = el.outerHTML;
        //将el转换为ast语法树再转换为render函数
        let render = compileToFunction(el);
        // 将render函数挂载到实例上
        options.render = render;
      }
    }
    // 挂载组件
    mounetComponent(vm, el);
  };
}
