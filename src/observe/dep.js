let id = 0;
class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  // 收集watcher
  depend() {
    // this.subs.push(Dep.target);
    Dep.target.addDep(this);
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 更新
  notify() {
    this.subs.forEach((watcher) => {
      watcher.updata();
    });
  }
}
// 添加watcher
Dep.target = null;
export function pushTarget(watcher) {
  Dep.target = watcher;
}

export function popTarget() {}
export default Dep;
