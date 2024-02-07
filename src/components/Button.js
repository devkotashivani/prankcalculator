import React from "react";

function Button({ cls, label, handler }) {
  return (
    <div className={cls} onClick={() => handler(label)}>
      {label}
    </div>
  );
}

export default Button;
