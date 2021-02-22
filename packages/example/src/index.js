import React from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";

import "../public/style.css";

ReactDOM.render(
  <Button type="primary" text="Hello" url="/" />,
  document.getElementById("root")
);
