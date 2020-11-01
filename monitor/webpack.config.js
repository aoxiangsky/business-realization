const path = require("path");
// user-agent 用于把浏览器的UserAgent变成一个对象
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  context: process.cwd(), // 上下文目录
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "monitor.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 8868,
    // before是用来配置路由的,express服务器
    // before(app) {
    //   app.get("/success", function (req, res) {
    //     res.json({ id: 1 }); // 200
    //   });
    //   app.post("/error", function (req, res) {
    //     res.sendStatus(500); // 500
    //   });
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html", inject: "head" }),
  ],
};
