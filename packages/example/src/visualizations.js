import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DynamicContentLayout from "./layout/DynamicContent";

import { init, form } from "@dc-visualization-sdk/core";

import Print from "./components/Print";

import "../public/style.css";

const App = () => {
  const [model, setModel] = useState({});

  const connect = () => {
    init();

    form.changed((model) => {
      setModel(model);
    });
  };

  useEffect(() => {
    connect();
  }, []);

  return <Print code={model} />;
};

ReactDOM.render(
  <DynamicContentLayout>
    <App />
  </DynamicContentLayout>,
  document.getElementById("root")
);
