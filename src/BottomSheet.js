import React from "react";

let startPosition = 0;
let currentPosition = 0;
let oldTranslateBy = 0;
let translateBy = 0;

export default function BottomSheet({ show, onHide, children }) {
  const [translateStyle, setTranslateStyle] = React.useState("0");
  const [dragging, setDragging] = React.useState(false);

  const setDefaults = () => {
    startPosition = 0;
    currentPosition = 0;
    oldTranslateBy = 0;
    translateBy = 0;
  };

  const handleMouseDown = () => {
    setDragging(true);
    setDefaults();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = () => {
    setDragging(true);
    setDefaults();
    document.addEventListener("touchmove", handleTouchMove);
  };

  const handleTouchEnd = () => {
    setDragging(false);
    document.removeEventListener("touchmove", handleTouchMove);
    handleRelease();
  };

  const handleRelease = React.useCallback(() => {
    if (translateBy <= oldTranslateBy && translateBy !== 0) {
      translateBy = 0;
      setTranslateStyle("0");
      onHide();
    } else {
      setTranslateStyle(`-100% - 20px`);
      translateBy = 0;
      oldTranslateBy = 0;
    }
  }, [setTranslateStyle, onHide]);

  const handleMove = React.useCallback((y) => {
    if (startPosition === 0 && currentPosition === 0) {
      startPosition = y;
    }

    let newPosition = startPosition - currentPosition;

    if (newPosition >= 0) {
      currentPosition = startPosition;
      newPosition = 0;
    }

    if (newPosition !== oldTranslateBy && newPosition !== translateBy) {
      oldTranslateBy = translateBy;
    }

    translateBy = newPosition;

    setTranslateStyle(`-100% - 20px - ${newPosition}px`);
    currentPosition = y;
  }, []);

  const handleTouchMove = React.useCallback(
    (e) => {
      e.preventDefault();
      const touch = e.touches[0] || e.changedTouches[0];
      handleMove(touch.pageY);
    },
    [handleMove]
  );

  const handleMouseMove = React.useCallback(
    (e) => {
      handleMove(e.clientY);
    },
    [handleMove]
  );

  const handleMouseUp = React.useCallback(() => {
    setDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    handleRelease();
  }, [setDragging, handleRelease, handleMouseMove]);

  React.useEffect(() => {
    if (!show) {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }, [show, handleTouchMove, handleMouseMove, handleMouseUp]);

  return (
    <div
      style={show ? { transform: `translateY(calc(${translateStyle}))` } : {}}
      className={`bottom-sheet${show ? " show" : ""}${
        dragging ? " dragging" : ""
      }`}
    >
      <div
        className="bottom-sheet-grip"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <div />
      </div>
      {children}
    </div>
  );
}
