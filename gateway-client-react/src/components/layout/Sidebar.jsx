import { Link } from 'react-router-dom';
import { logout } from '../../auth/authService';

const Sidebar = () => (
  <div className="bg-dark border-end" style={{ width: '250px', minHeight: 'calc(100vh - 56px)' }}>
    <ul className="nav flex-column p-3">
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="/admin/admin">
          <i className="bi bi-people me-2"></i> Admin
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="/admin/ms-a">
          <i className="bi bi-gear me-2"></i> ms-a
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="/admin/ms-b">
          <i className="bi bi-question-circle me-2"></i> ms-b
        </Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="/admin/union-a-b">
          <i className="bi bi-link me-2"></i> Union A y B
        </Link>
      </li>
      <button onClick={logout} className="btn btn-outline-danger w-100">
        <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
      </button>
    </ul>
  </div>
);
export default Sidebar;