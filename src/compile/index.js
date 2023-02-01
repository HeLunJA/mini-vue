import { generate } from "./generate.js";
import { parseHTML } from "./parseAst.js";
export function compileToFunction(el) {
  // 解析html转换为ast语法树
  let ast = parseHTML(el);
  // ast语法树转换为render函数。
  let code = generate(ast)
}
