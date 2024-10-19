import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Logout({ setIsAuthenticated }) {
    const navigate = useNavigate();

    React.useEffect(() => {
        toast.success('See you later.', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    }, [navigate, setIsAuthenticated]);

    return null;
}

export default Logout;
