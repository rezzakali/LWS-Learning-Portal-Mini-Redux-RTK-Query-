import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from '../features/auth/authSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authCheck, setAuthCheck] = useState(false);

  useEffect(() => {
    const auth = localStorage?.getItem('auth');

    if (auth) {
      const isAuth = JSON.parse(auth);
      if (isAuth?.accessToken && isAuth?.user) {
        dispatch(
          Login({
            accessToken: isAuth.accessToken,
            user: isAuth.user,
          })
        );
      }
    }
    setAuthCheck(true);
  }, [dispatch, setAuthCheck]);

  return authCheck;
};

export default useAuthCheck;
