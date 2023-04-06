import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import learningPortalImage from '../../assets/image/learningportal.svg';
import { adminLoggedOut } from '../../features/auth/authSlice';

function AdminNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let adminName = null;

  const auth = localStorage?.getItem('auth');
  if (auth) {
    const isAuth = JSON.parse(auth);
    const { name } = isAuth?.user;
    adminName = name;
  }

  const handleLoggedOut = () => {
    localStorage.clear('auth');
    window.location.reload();
    dispatch(adminLoggedOut());
    localStorage.clear('auth');
    setTimeout(() => {
      navigate('/');
    }, 70);
  };

  return (
    <nav className="shadow-md border-b border-slate-600/50">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/admin/dashboard">
          <img
            className="h-10"
            src={learningPortalImage}
            alt="lws_header_logo"
          />
        </Link>
        <div className="flex items-center gap-3">
          <h2 className="font-bold">{adminName}</h2>
          <button
            className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            onClick={handleLoggedOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
