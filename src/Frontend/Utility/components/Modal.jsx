import React, { useEffect } from "react";
import { MODAL } from "../../actions/Auth";
import { useAuth } from "../../Context/Auth";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./index.css";

function Modal({ children, show, closeCallBack }) {
  const [ref, clickedOutside] = useOutsideClick();
  const { dispatch, modal } = useAuth();
  useEffect(() => clickedOutside && closeCallBack(), [clickedOutside]);
  return (
    <div id="kash-modal" class="kash-modal-container">
      <div ref={ref} class="kash-modal">
        {children}
      </div>
    </div>
  );
}

export default Modal;
