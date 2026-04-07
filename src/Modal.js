import "./styles.css";
import ReactDom from "react-dom";

export default function Modal({ children }) {
  return ReactDom.createPortal(
    <>
      <div className="modal--backdrop"></div>
      <div className="modal--container">{children}</div>
    </>,
    document.getElementById("portal-root")
  );
}
