import { patch } from "./vnode/patch";

export function mounetComponent(vm, el) {
  //_render将render函数转换为vnode,_updata是将vnode转换为真实dom
  vm._updata(vm._render());
}

export function lifecycleMixin(Vue) {
  // 将虚拟dom转换为真实dom
  Vue.prototype._updata = function (vnode) {
    let vm = this;
    vm.$el = patch(vm.$el, vnode); // 传入旧的dom和虚拟dom
  };
}
