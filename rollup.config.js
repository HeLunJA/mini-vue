import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
export default {
  input: "./src/index.js", // 打包入口文件
  output: {
    file: "dist/vue.js", // 打包出口文件
    format: "umd", // 在window上添加Vue
    name: "Vue",
    sourcemap: true, // 将转换的代码与源代码进行映射
  },
  plugins: [
    babel({
      exclude: "node_modules/**", // 排出node_modules下的所有文件
    }), // 将高级语法转换为低级语法
    serve({
      port: 3000,
      contentBase: "", // 空字符串表示在当前目录
      openPage: "/index.html",
    }), // 开启端口号为3000的服务
  ],
};
