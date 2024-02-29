import React, { useEffect, useRef, useState } from 'react';
import { useMenucontext } from '../hooks/useMenuContext';
import generatePDF from 'react-to-pdf';
import MenuDetails from '../components/menuDetails';
import MenuForm from '../components/menuForm';

const CateringHome = () => {
  const targetRef = useRef();
  const { menu, dispatch } = useMenucontext();
  const [filteredMenu, setFilteredMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch('/api/Cater/menus');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_MENU', payload: json });
        setFilteredMenu(json); // Set the initial state with all menus
      }
    };

    fetchMenu();
  }, [dispatch]);

  const handleFilter = (filterCriteria) => {
    if (filterCriteria === '') {
      setFilteredMenu(menu);
    } else {
      const filteredMenus = menu.filter((menu) =>
        menu.Caterer_name.toLowerCase().includes(filterCriteria.toLowerCase())
      );
      setFilteredMenu(filteredMenus);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <button
          className="btn btn-primary mb-3"
          role="button"
          onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })}
        >
          Download PDF
        </button>
        <div className="input-group mb-3">
          <input
            className='form-control'
            type="text"
            placeholder="Search"
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8" ref={targetRef}>
            {filteredMenu.map((menu) => (
              <MenuDetails key={menu._id} menu={menu} />
            ))}
          </div>
          <div className="col-md-4">
            <MenuForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default CateringHome;
