import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const element = document.getElementsByClassName('layout');
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: element?.[0]?.scrollHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setSize({
        width: innerWidth,
        height: element?.[0]?.scrollHeight,
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
      height: element?.[0]?.scrollHeight,
    }));
  }, [element?.[0]?.scrollHeight]);

  return size;
};

export default useWindowDimensions;
