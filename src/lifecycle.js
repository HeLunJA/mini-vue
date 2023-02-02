import { patch } from "./vnode/patch";
export function mounetComponent(vm, el) {
  callHook(vm, "beforeMounted");
  //_render将render函数转换为vnode,_updata是将vnode转换为真实dom
  vm._updata(vm._render());
  callHook(vm, "mounted");
}

export function lifecycleMixin(Vue) {
  // 将虚拟dom转换为真实dom
  Vue.prototype._updata = function (vnode) {
    let vm = this;
    vm.$el = patch(vm.$el, vnode); // 传入旧的dom和虚拟dom
  };
}

// 生命周期调用
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(this);
    }
  }
}
