import React, {useState, useEffect} from 'react';

const useMinimizer = (defaultHidden) => {
  const [hidden, setHidden] = useState(defaultHidden);
  const [hiddenClass, setHiddenClass] = useState("");
  useEffect(() => {
    setHiddenClass(hidden?"hidden":"");
  }, [hidden])
  return {
    hidden,
    toggleHidden: () => setHidden(!hidden),
    hiddenClass
  };
};

export default useMinimizer;