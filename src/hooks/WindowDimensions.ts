import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useWindowDimensions = () => {
  const layoutHeight = 80;
  const upperPadding = 10;
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight - layoutHeight - upperPadding,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - layoutHeight - upperPadding,
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
