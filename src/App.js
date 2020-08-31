import React from "react";
import "./styles.css";
import BottomSheet from "./BottomSheet";

export default function App() {
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const handleShowClick = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  const handleShow2Click = () => {
    setShow2(true);
  };

  const handleHide2 = () => {
    setShow2(false);
  };

  return (
    <div className="App">
      <button onClick={handleShowClick}>Show bottom sheet</button>
      <button onClick={handleShow2Click}>Show bottom sheet 2</button>
      <BottomSheet show={show} onHide={handleHide}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </BottomSheet>
      <BottomSheet show={show2} onHide={handleHide2}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 3</div>
        <div>Item 3</div>
        <div>Item 3</div>
        <div>Item 3</div>
        <div>Item 3</div>
      </BottomSheet>
    </div>
  );
}
