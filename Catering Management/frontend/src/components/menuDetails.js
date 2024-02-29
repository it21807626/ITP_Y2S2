import { useMenucontext } from "../hooks/useMenuContext";
import { Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const MenuDetails = ({ menu }) => {
    const { dispatch } = useMenucontext();

    const handleClick = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");

        if (confirmed) {
            const response = await fetch('/api/Cater/' + menu._id, {
                method: 'DELETE'
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_MENU', payload: json });
            }
        }
    };

    return (
        <div className="menu-details card mb-3">
            <div className="card-body">
                <h4 className="card-title">{menu.Caterer_name}</h4>
                <h5 className="card-subtitle mb-2 text-muted">{menu.Menu_name}</h5>
                <p className="card-text"><strong>Menu items:</strong>{menu.Menu_items}</p>
                <p className="card-text"><strong>Price in LKR:</strong>{menu.price}</p>
                <p className="card-text">{formatDistanceToNow(new Date(menu.createdAt), { addSuffix: true })}</p>
                <span className="material-symbols-outlined btn btn-danger" onClick={handleClick}>Delete</span>
                <div className="update">
                    <Link to={{ pathname: `/updateForm/${menu._id}`, state: { menu } }} className="btn btn-outline-primary">
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuDetails;
