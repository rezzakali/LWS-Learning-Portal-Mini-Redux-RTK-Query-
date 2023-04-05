import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  if (user) {
    if (user.role === 'student') {
      return children;
    } else if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  }
};

export default PrivateRoute;
