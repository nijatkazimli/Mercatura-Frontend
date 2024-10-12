import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const element = document.getElementsByClassName('layout');
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: Math.max(element?.[0]?.scrollHeight, window.innerHeight - 80),
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setSize({
        width: innerWidth,
        height: Math.max(element?.[0]?.scrollHeight, window.innerHeight - 80),
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setSize((prevSize) => ({
      ...prevSize,
      height: Math.max(element?.[0]?.scrollHeight, window.innerHeight - 80),
    }));
  }, [element?.[0]?.scrollHeight]);

  return size;
};

export default useWindowDimensions;
