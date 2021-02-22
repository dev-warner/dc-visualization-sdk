import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DynamicContentLayout from "./layout/DynamicContent";

import * as Connection from "@dc-visualization-sdk/core";

import Print from "./components/Print";

import "../public/style.css";

const App = () => {
  const [model, setModel] = useState({});

  const connect = async () => {
    const sdk = new Connection.Visualization();

    await sdk.init();

    sdk.onModelChange(
      (model) => {
        setModel(model);
      },
      { depth: "root" }
    );
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
