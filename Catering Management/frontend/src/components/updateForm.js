import React from 'react';
import { useEffect, useState } from 'react';
import useMenuContext from '../hooks/useMenuContext';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateForm = () => {
  const { menu, dispatch } = useMenuContext();
  const [Caterer_name, setCaterer_name] = useState('');
  const [Menu_name, setMenu_name] = useState('');
  const [Menu_items, setMenu_items] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (menu && menu.length > 0 && isMounted) {
      const selectedMenu = menu.find((m) => m._id === id);

      if (selectedMenu) {
        setCaterer_name(selectedMenu.Caterer_name);
        setMenu_name(selectedMenu.Menu_name);
        setMenu_items(selectedMenu.Menu_items);
        setPrice(selectedMenu.price);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [menu]);

  const handleUpdateClick = async () => {
    const updatedMenu = { Caterer_name, Menu_name, Menu_items, price };

    if (!Caterer_name || !Menu_name || !Menu_items || !price) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please fill in all fields',
      });
      return;
    }

    const response = await fetch(`/api/Cater/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedMenu),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Updated successfully',
      });
      setError(null);
      dispatch({ type: 'UPDATE_MENU', payload: json });
      navigate('/');
    }
  };

  return (
    <div className="update-menu container mt-4">
      <h2>Edit Menu</h2>
      <form>
        <div className="form-group">
          <label>Menu name:</label>
          <input
            type="text"
            value={Menu_name}
            onChange={(e) => setMenu_name(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Menu items:</label>
          <input
            type="text"
            value={Menu_items}
            onChange={(e) => setMenu_items(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdateClick}
        >
          Update
        </button>
      </form>
      {error && <div className="error mt-3">{error}</div>}
    </div>
  );
};

export default UpdateForm;
