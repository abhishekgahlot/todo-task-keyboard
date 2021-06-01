import { useState, useEffect } from 'react';

const useKeyboardShortcuts = () => {
  const [arrowDown, setArrowDown] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [shiftEnter, setShiftEnter] = useState(false);

  const keyPressHandler = (pressed, e) => {
    switch (e.key) {
      case 'ArrowUp':
        setArrowUp(pressed);
        break;
      case 'ArrowDown':
        setArrowDown(pressed);
        break;
      case 'Enter':
        setShiftEnter(pressed && e.shiftKey);
        break;
      default:
        break;
    }
  };

  const downHandler = e => {
    keyPressHandler(true, e);
  };

  const upHandler = e => {
    keyPressHandler(false, e);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return [arrowUp, arrowDown, shiftEnter];
};

export default useKeyboardShortcuts;
