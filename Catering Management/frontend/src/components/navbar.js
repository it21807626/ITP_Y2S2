import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-lg">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <p className='h3'>Catering</p>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
