import React, { createContext, useState } from "react";
import { ContentClient } from "dc-delivery-sdk-js";

export const DynamicContentContext = createContext(null);

export default function DynamicContentLayout({ children }) {
  const [client, setClient] = useState(
    new ContentClient({
      account: "ampeng",
      stagingEnvironment: new URL(window.location.href).searchParams.get("vse"),
      locale: new URL(window.location.href).searchParams.get("locale"),
    })
  );

  function changeClientOptions({ vse, locale }) {
    setClient(
      new ContentClient({
        account: "ampeng",
        stagingEnvironment: vse,
        locale,
      })
    );
  }

  return (
    <DynamicContentContext.Provider value={{ client, changeClientOptions }}>
      {children}
    </DynamicContentContext.Provider>
  );
}
