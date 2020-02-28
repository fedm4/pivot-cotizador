import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import './useMinimizer.scss';

const useMinimizer = (defaultHidden) => {
  const [hidden, setHidden] = useState(defaultHidden);
  const [hiddenClass, setHiddenClass] = useState("");
  useEffect(() => {
    setHiddenClass(hidden?"hidden":"");
  }, [hidden]);
  const toggleHidden = () => setHidden(!hidden);
  return {
    hidden,
    toggleHidden,
    hiddenClass,
    Icon: () => (
            <span className="icon">
              <FontAwesomeIcon onClick={toggleHidden} icon={faChevronCircleRight} />
            </span>
          )
  };
};

export default useMinimizer;