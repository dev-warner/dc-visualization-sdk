import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DynamicContentLayout from "./layout/DynamicContent";

import visualization from "@dc-visualization-sdk/core";

import Print from "./components/Print";

import "../public/style.css";

const App = () => {
  const [model, setModel] = useState({});
  const [locale, setLocale] = useState("");
  const [settings, setSettings] = useState({});
  const [deliveryKey, setDeliveryKey] = useState("");
  const [saved, setSaved] = useState(null);

  const connect = async () => {
    try {
      await visualization.init();

      visualization.form.changed((model) => {
        setModel(model);
      });

      visualization.form.saved(() => {
        setSaved("Saved");

        setTimeout(() => setSaved(null), 500);
      });

      visualization.settings.changed((settings) => {
        setSettings(settings);
      });

      visualization.deliveryKey.changed((deliveryKey) => {
        setDeliveryKey(deliveryKey);
      });

      visualization.locale.changed((locale) => {
        setLocale(locale);
      });

      const [settings, deliveryKey, locale] = await Promise.all([
        visualization.settings.get(),
        visualization.deliveryKey.get(),
        visualization.locale.get(),
      ]);

      setLocale(locale);
      setSettings(settings);
      setDeliveryKey(deliveryKey);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      {saved && <Print code={saved} />}
      <Print title="Form" code={model} />
      <Print title="Settings" code={settings} />
      <Print title="Delivery Key" code={deliveryKey} />
      <Print title="Locale" code={locale} />
    </>
  );
};

ReactDOM.render(
  <DynamicContentLayout>
    <App />
  </DynamicContentLayout>,
  document.getElementById("root")
);
