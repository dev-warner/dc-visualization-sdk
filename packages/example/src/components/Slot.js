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

function Tag({ classes, suggestedTarget }) {
  const coverage = (suggestedTarget.coverage * 100).toFixed(2);
  const type = suggestedTarget.type === "TAG" ? "tag" : "behaviour";

  return (
    <>
      <TrendIcon className={classes.icon} />
      <Typography variant="subtitle1">
        Increase relevance to {coverage}% by targeting {type} "
        {suggestedTarget.target}"
      </Typography>
    </>
  );
}

function Baz({ classes, percentage, tag, suggestedTarget }) {
  const tags = uniqueTags.map((tag) => (
    <Chip
      clickable={false}
      className={classes.chip}
      label={tag}
      key={tag}
      size="small"
    />
  ));

  return (
    <>
      <div className={classes.summary}>
        <Typography variant="h4" className={classes.percentage}>
          {percentage}%
        </Typography>
        <Typography variant="subtitle1" className={classes.relevancy}>
          The currently targeted content will be relevant to {percentage}% of
          your visitors
        </Typography>
        <div className={classes.chips}>{tags}</div>
      </div>
      <div className={classes.recommendations}>
        {suggestedTarget && (
          <Tag suggestedTarget={suggestedTarget} classes={classes} />
        )}
      </div>
    </>
  );
}
function Foo() {
  return (
    <>
      <If condition={!error && !loading}>
        <Baz
          classes={classes}
          percentage={percentage}
          tag={tag}
          suggestedTarget={suggestedTarget}
        />
      </If>
      <If condition={!error}>
        <div className={classes.progressBar}>
          <ProgressBar loading={loading} value={value} />
        </div>
      </If>
      <If condition={error}>
        <ErrorMessage>
          Sorry we are unable to calculate relevancy scores due to a problem
          retrieving the necessary data.
        </ErrorMessage>
      </If>
    </>
  );
}
