import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: Math.max(document.documentElement.scrollHeight, window.innerHeight - 80),
  });

  useEffect(() => {
    const element = document.getElementsByClassName('layout')?.[0];

    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: Math.max(element?.scrollHeight ?? 0, window.innerHeight - 80),
      });
    };

    window.addEventListener('resize', updateSize);

    const observer = new MutationObserver(updateSize);

    if (element) {
      observer.observe(element, { attributes: true, childList: true, subtree: true });
    }

    updateSize();

    return () => {
      window.removeEventListener('resize', updateSize);
      observer.disconnect();
    };
  }, []);

  return size;
};

export default useWindowDimensions;
