import React, {useContext, useEffect, useState} from 'react';
import MainContext from '../../context/MainContext';
import NotAuthorized from './components/NotAuthorized/NotAuthorized';

const useAuthBlocker = (permission) => {
    const {user} = useContext(MainContext);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        setIsAuthorized(user.roles.indexOf(permission) !== -1);
    }, [user.roles]);
    return {
        isAuthorized,
        NotAuthorized
    };
};

export default useAuthBlocker;