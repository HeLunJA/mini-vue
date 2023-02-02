export const HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
];
// 策略模式
let starts = {};
starts.data = function (parentVal, childVal) {
  return childVal;
};
starts.computed = function () {};
starts.watch = function () {};
starts.methods = function () {};
HOOKS.forEach((hooks) => {
  starts[hooks] = mergeHook;
});
function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      return [childVal];
    }
  } else {
    return parentVal;
  }
}
export function mergeOptions(parent, child) {
  const options = {};
  for (let key in parent) {
    megeField(key);
  }
  for (let key in child) {
    megeField(key);
  }
  function megeField(key) {
    if (starts[key]) {
      options[key] = starts[key](parent[key], child[key]);
    } else {
      options[key] = child[key];
    }
  }
  return options;
}
