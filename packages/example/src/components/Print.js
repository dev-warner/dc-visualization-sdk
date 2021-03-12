import React from "react";

export default function Print({ title, code }) {
  return (
    <>
      {title && <h2>{title}</h2>}
      <code>
        <pre>{JSON.stringify(code, null, 2)}</pre>
      </code>
    </>
  );
}
