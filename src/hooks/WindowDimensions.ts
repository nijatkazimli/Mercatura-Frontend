import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const layoutHeight = 80;
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight - layoutHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      const element = document.getElementsByClassName('product-grid');
      setSize({
        width: innerWidth,
        height: Math.max(innerHeight - layoutHeight, (element?.[0]?.scrollHeight ?? 0) + 40),
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

export default useWindowDimensions;
