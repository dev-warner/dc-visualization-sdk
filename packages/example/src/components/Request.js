import React, { useState, useContext, useEffect } from "react";
import { DynamicContentContext } from "../layout/DynamicContent";

export default function Request({ request }) {
  const { client } = useContext(DynamicContentContext);
  const [content, setContent] = useState({});

  useEffect(() => {
    async function fetch() {
      //   const { body } = await client.getContentItemById("");
      //   setContent(body);
    }

    fetch();
  }, [client]);

  return <div>{JSON.stringify(request || content)}</div>;
}
