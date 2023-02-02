export function patch(oldVnode, vnode) {
  // 将vnode变为真实dom
  let el = createEl(vnode);
  // 替换
  let parentEl = oldVnode.parentNode;
  parentEl.insertBefore(el, oldVnode.nextsibling);
  parentEl.removeChild(oldVnode)
  return el
}

// 创建dom
function createEl(vnode) {
  let { tag, children, key, data, text } = vnode;
  // 判断tag是否为标签
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag); // 创建元素
    if (children.length > 0) {
      // 给元素追加子集
      children.forEach((child) => {
        vnode.el.appendChild(createEl(child));
      });
    }
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
