class watcher {
  constructor(vm, updataComponent, cb, options) {
    this.vm = vm;
    this.exprOrfn = updataComponent;
    this.cb = cb;
    this.options = options;
    if (typeof updataComponent === "function") {
      // 用来做视图更新
      this.getter = updataComponent;
    }
    //更新视图
    this.get();
  }
  get() {
    this.getter();
  }
}
export default watcher;
