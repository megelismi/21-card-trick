 import { useState, useEffect } from 'react';

    function useWindowSize() {
      const [windowSize, setWindowSize] = useState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });

      useEffect(() => {
        function handleResize() {
          setWindowSize({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
          });
        }

        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
      }, []); // Empty array ensures effect runs only once on mount

      return windowSize;
    }

    export default useWindowSize;