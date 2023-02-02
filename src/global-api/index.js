import { mergeOptions } from "../utils/index";

export function initGlobApi(Vue) {
  Vue.options = {};
  Vue.Mixin = function (mixin) {
    // 对象合并
    this.options = mergeOptions(this.options, mixin);
    console.log(Vue.options)
  };
}
