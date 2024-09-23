import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useWindowDimensions = () => {
  const layoutHeight = 80;
  const upperPadding = 10;
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    scrollHeight: document.documentElement.scrollHeight,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      const { scrollHeight } = document.getElementsByClassName('product-grid')[0];
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollHeight: scrollHeight < window.innerHeight ? window.innerHeight - layoutHeight - upperPadding : scrollHeight,
      });
    }, 100);
    window.addEventListener('resize', handleResize);

    return () => {
      handleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

export default useWindowDimensions;
