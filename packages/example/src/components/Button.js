import React from "react";

export default ({ text, type, url }) => (
  <button className={`button button__${type}`} href={url}>
    {text}
  </button>
);
