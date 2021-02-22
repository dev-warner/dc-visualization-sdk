const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

const template = require("./template.js");

module.exports = class Plugin {
  constructor() {
    this.type = "file";
  }

  init(config, files) {
    if (!fs.existsSync(path.join(process.cwd(), "visualizations"))) {
      fs.mkdirSync(path.join(process.cwd(), "visualizations"));
    }
    files.forEach((file, index) => {
      const src = `../${file}`;
      fs.writeFileSync(
        path.join(process.cwd(), `visualizations/${index}.html`),
        ejs.render(template, {
          src,
          title: "vis",
          styles: config.styles.map((style) => "../" + style) || [],
        })
      );
    });
  }
};
