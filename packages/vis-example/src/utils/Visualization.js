import visualization from "@dc-visualization-sdk/core";
import React, { createContext, useContext, useEffect, useState } from "react";

export const VisualizationContext = createContext();

export const useContent = () => {
  const model = useContext(VisualizationContext);

  return model;
};

export default function VisualizationProvider({ children }) {
  const [state, setState] = useState({ content: {} });

  useEffect(() => {
    async function start() {
      await visualization.init();

      visualization.form.changed((model) => {
        setState(model);
      });
    }

    start();
  }, []);

  return (
    <VisualizationContext.Provider value={state}>
      {children}
    </VisualizationContext.Provider>
  );
}
