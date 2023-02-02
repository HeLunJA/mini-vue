import { initGlobApi } from "./global-api/index";
import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vnode/index";
function Vue(options) {
  // 初始化
  this._init(options);
}
// 初始化状态和渲染模板
initMixin(Vue);
// 初始化生命周期
lifecycleMixin(Vue);
// 添加_render
renderMixin(Vue);

// 初始化全局方法
initGlobApi(Vue);
export default Vue;
