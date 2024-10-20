import React from "react";
import "./button1.scss";

function Button1({ text, onClickFunction = () => "", isLoading = false }) {
  return (
    <div
      className="button-type1"
      type={"submit"}
      onClick={isLoading ? null : () => onClickFunction()}
      style={{
        background: isLoading ? "grey" : "",
        cursor: isLoading ? "not-allowed" : "pointer",
      }}
    >
      {text}
    </div>
  );
}

export default Button1;
