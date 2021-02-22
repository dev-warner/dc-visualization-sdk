const ReactPlugin = require("./plugin/ReactPlugin");

module.exports = {
  include: ["./**/*.visualization.js"],
  styles: ["public/style.css"],
  plugins: [new ReactPlugin()],
};
