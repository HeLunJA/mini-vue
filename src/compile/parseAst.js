const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA_Z]*`; // 匹配标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //匹配特殊标签<span:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 开始标签部分
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 结束标签部分</>
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 静态属性解析
const startTagClose = /^\s*(\/?)>/; //开始标签结束
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
// 创建ast语法树
function createASTElement(tag, attrs) {
  return {
    tag, // 元素
    attrs,
    children: [], // 子节点
    type: 1,
    parent: null, // 是否有父元素
  };
}
let root; // 根元素
let createParent; // 当前元素的父元素
let stack = []; // 栈
// 获取开始标签
function start(tag, attrs) {
  let element = createASTElement(tag, attrs);
  if (!root) {
    root = element;
  }
  createParent = element;
  stack.push(element);
}
// 获取文本
function charts(text) {
  // 空格
  text = text.replace(/a/g, "");
  if (text) {
    createParent.children.push({
      type: 3,
      text,
    });
  }
}
// 获取结束标签
function end(end) {
  let element = stack.pop(); // 获取栈中最后一项（出栈）
  createParent = stack[stack.length - 1];
  if (createParent) {
    element.parent = createParent.tag;
    createParent.children.push(element);
  }
}

export function parseHTML(html) {
  while (html) {
    // 遍历html
    let textEnd = html.indexOf("<");
    // 开始标签
    if (textEnd === 0) {
      const startTagMatch = parseStartTag(); // 开始标签内容
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      // 结束标签
      let endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    // 获取文本内容
    let text;
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      // 删除文本
      advance(text.length);
      charts(text);
    }
  }
  function parseStartTag() {
    const start = html.match(startTagOpen); //返回false或者结果
    if (!start) return;
    // console.log(start) 输出['<div', 'div', index: 0, input: '<div id="app">{{message}}</div>', groups: undefined]
    // 创建ast语法树
    let match = {
      tagName: start[1],
      attrs: [],
    };
    // 删除开始标签<div
    advance(start[0].length);
    let attr;
    let end;
    while (
      !(end = html.match(startTagClose)) &&
      (attr = html.match(attribute))
    ) {
      match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] });
      advance(attr[0].length);
    }
    if (end) {
      advance(end[0].length);
    }
    return match;
  }
  function advance(n) {
    html = html.substring(n);
  }
  return root;
}
