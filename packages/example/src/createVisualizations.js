import React from "react";
import { useState, useEffect, useContext } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import * as Connection from "@dc-visualization-sdk/core";

export const VisualizationContext = React.createContext(null);

export function useVisualization(sdk, setModel, config) {
  useEffect(() => {
    if (sdk && sdk.connection && sdk.connected) {
      sdk.connection.onModelChange((context) => {
        setModel(context);
      }, config);
    }
  }, []);
}

export function Visualization({ Component, config }) {
  const sdk = useContext(VisualizationContext);
  const [model, setModel] = useState({});
  const [_config] = useState(config);

  useVisualization(sdk, setModel, _config);

  return <Component model={model} />;
}

export default class Visualizations {
  visualizations = [];

  add(path, Component, config) {
    this.visualizations.push({
      path,
      Component: () => <Visualization Component={Component} config={config} />,
    });

    return this;
  }

  page(path, Component, config) {
    this.visualizations.push({ path, Component, config });

    return this;
  }

  run() {
    const connect = async (setSDK) => {
      const sdk = new Connection.Visualization();

      await sdk.init();

      setSDK({
        connection: sdk,
        connected: true,
      });
    };

    return () => {
      const [sdk, setSDK] = useState(null);

      useEffect(() => {
        connect(setSDK);
      }, []);

      return (
        <VisualizationContext.Provider value={sdk}>
          <BrowserRouter>
            {sdk &&
              sdk.connected &&
              this.visualizations.map(({ path, Component, config }) => (
                <Route key={path} path={path}>
                  <Visualization Component={Component} config={config} />
                </Route>
              ))}
          </BrowserRouter>
        </VisualizationContext.Provider>
      );
    };
  }
}
