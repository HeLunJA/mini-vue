import { generate } from "./generate.js";
import { parseHTML } from "./parseAst.js";
export function compileToFunction(el) {
  // 解析html转换为ast语法树
  let ast = parseHTML(el);
  // ast语法树转换为render字符串。
  let code = generate(ast);
  // 将render字符串变为函数
  console.log(code, 6666)
  let render = new Function(`with(this){return ${code}}`);
  console.log(render, 6666)
  return render;
}
