const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 检测文本
// 处理attrs的属性
function genProps(attrs) {
  let str = "";
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === "style") {
      let obj = {};
      // 将style样式里的字符串进行分隔，然后转为对象
      attr.value.split(";").forEach((item) => {
        let [key, val] = item.split(":");
        obj[key] = val;
      });
      attr.value = obj;
    }
    // 拼接
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}
// 处理子节点
function genChildren(el) {
  let children = el.children;
  if (children) {
    return children.map((child) => gen(child)).join(",");
  }
}
// 处理子节点内容
function gen(node) {
  if (node.type === 1) {
    // 如果节点内容为普通元素
    return generate(node);
  } else {
    let text = node.text;
    // 解析文本是否有插值表达式{{}}, 没有直接返回_v
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`;
    }
    // 有插值表达式
    let tokens = [];
    let lastindex = (defaultTagRE.lastIndex = 0);
    let match;
    while ((match = defaultTagRE.exec(text))) {
      let index = match.index;
      if (index > lastindex) {
        tokens.push(JSON.stringify(text.slice(lastindex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      // 判断插值表达式后面还有内容
      lastindex = index + match[0].length;
    }
    if (lastindex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastindex)));
    }
    return `_v(${tokens.join("+")})`;
  }
}
export function generate(el) {
  let children = genChildren(el);
  let code = `_c('${el.tag}',${
    el.attrs.length ? genProps(el.attrs) : "undefined"
  }${children ? `,${children}` : ""})`;
  return code;
}
