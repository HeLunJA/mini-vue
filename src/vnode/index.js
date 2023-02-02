export function renderMixin(Vue) {
  // 转换标签
  Vue.prototype._c = function () {
    // 创建标签
    return createElement(...arguments);
  };
  // 转换文本
  Vue.prototype._v = function (text) {
    return createText(text);
  };
  // 转换变量_s(num)
  Vue.prototype._s = function (val) {
    return val == null
      ? ""
      : typeof val === "object"
      ? JSON.stringify(val)
      : val;
  };
  Vue.prototype._render = function () {
    let vm = this;
    let render = vm.$options.render;
    // 得到虚拟dom
    let vnode = render.call(this);
    return vnode;
  };
}

// 创建元素
function createElement(tag, data = {}, ...children) {
  return vnode(tag, data, data.key, children);
}
// 创建文本
function createText(text) {
  return vnode(undefined, undefined, undefined, undefined, text);
}
// 创建虚拟dom
function vnode(tag, data, key, children, text) {
  return { tag, data, key, children, text };
}
