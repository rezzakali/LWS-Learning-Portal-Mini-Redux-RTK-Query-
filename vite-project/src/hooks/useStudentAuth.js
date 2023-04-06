function useStudentAuth() {
  const auth = localStorage?.getItem('auth');
  const authData = JSON.parse(auth);

  if (
    authData?.accessToken &&
    authData?.user &&
    authData?.user?.role === 'student'
  ) {
    return true;
  } else {
    return false;
  }
}

export default useStudentAuth;
