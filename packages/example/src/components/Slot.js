import React, { useContext, useState, useEffect } from "react";

import Button from "./Button";
import Request from "./Request";

import { VisualizationContext } from "../createVisualizations";
import { DynamicContentContext } from "../layout/DynamicContent";

export default function Page() {
  const connection = useContext(VisualizationContext);

  const { client } = useContext(DynamicContentContext);
  const [content, setContent] = useState({});

  async function getContent() {
    // const content = await client.getContentItemById("");
    // setContent(content);
  }

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "visualisation" && connection) {
      connection.onModelChange((model) => {
        setContent(model.body);
      });
    }
  }, [connection]);

  console.log(content);

  return (
    <>
      <Request request={content.request} />
      <Button {...content.button} />
    </>
  );
}
