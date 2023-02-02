import { pushTarget, popTarget } from "./dep";
let id = 0;
class Watcher {
  constructor(vm, updataComponent, cb, optins) {
    this.vm = vm;
    this.exprOrfn = updataComponent;
    this.cb = cb;
    this.options = optins;
    this.id = id++;
    this.deps = []; // 存dep
    this.depsId = new Set(); // 存depid，去重
    if (typeof updataComponent === "function") {
      // 用来做视图更新
      this.getter = updataComponent;
    }
    //更新视图
    this.get();
  }
  get() {
    pushTarget(this); // 给dep添加watcher
    this.getter(); // 渲染
    popTarget(); // 取消dep的watcher
  }
  updata() {
    this.getter();
  }
  addDep(dep) {
    // 去重
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
      dep.addSub(this);
    }
  }
}
export default Watcher;
