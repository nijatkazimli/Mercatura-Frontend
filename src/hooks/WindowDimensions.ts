import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 80,
  });

  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (element) {
        setSize({
          width: window.innerWidth,
          height: Math.max(element.scrollHeight, window.innerHeight - 80),
        });
      }
    };

    const handleMutation = () => {
      updateSize();
    };

    const observer = new MutationObserver(handleMutation);

    if (element) {
      observer.observe(element, { attributes: true, childList: true, subtree: true });
    }

    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize);

    updateSize();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [element]);

  useEffect(() => {
    const findElement = setInterval(() => {
      const foundElement = document.getElementsByClassName('layout')?.[0];
      if (foundElement) {
        setElement(foundElement);
        clearInterval(findElement);
      }
    }, 100);

    return () => clearInterval(findElement);
  }, []);

  return size;
};

export default useWindowDimensions;
