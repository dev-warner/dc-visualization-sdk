import React from "react";

export default function Print({ code }) {
  return (
    <code>
      <pre>{JSON.stringify(code, null, 2)}</pre>
    </code>
  );
}
