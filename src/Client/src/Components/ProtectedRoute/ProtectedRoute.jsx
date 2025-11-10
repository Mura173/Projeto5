import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext.jsx';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.tipo_usuario !== role) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;