import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Product Dashboard</Link>
        <div className="d-flex">
          <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
          <Link className="btn btn-outline-light me-2" to="/signup">Signup</Link>
          <button className="btn btn-light" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
