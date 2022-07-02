import React, { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

function ReactPortal({ children }) {
  const [wrapperElement, setWrapperElement] = useState(null);
  let ele = document.getElementById("modal-root");
  useEffect(() => {
    if (!ele) {
      const wrapper = document.createElement("div");
      wrapper.id = "modal-root";
      ele = wrapper;

      document.body.appendChild(ele);
    }
    setWrapperElement(ele);
  }, []);
  if (wrapperElement === null) return null;
  return createPortal(children, wrapperElement);
}

export default ReactPortal;
