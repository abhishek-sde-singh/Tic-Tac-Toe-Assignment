import React, { memo } from "react";

const Box = memo(({ value, onClick }) => {
  return (
    <button style={{ width: "100px", height: "100px" }} onClick={onClick}>
      <h1>{value}</h1>
    </button>
  );
});

export default Box;
