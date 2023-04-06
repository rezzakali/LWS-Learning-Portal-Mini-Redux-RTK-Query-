import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import learningPortalImage from '../../assets/image/learningportal.svg';
import { studentLoggedOut } from '../../features/auth/authSlice';

function StudentNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoggedOut = () => {
    window.location.reload();
    dispatch(studentLoggedOut());
    setTimeout(() => {
      navigate('/');
    }, 100);
    localStorage.clear('auth');
  };

  let name = '';
  const auth = localStorage?.getItem('auth');
  if (auth) {
    const loggedInUser = JSON.parse(auth);
    name = loggedInUser?.user.name;
  }

  return (
    <nav className="shadow-md fixed top-0 left-0 w-full z-10 bg-primary border-b border-slate-600/50">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/courseplayer">
          <img
            className="h-10"
            src={learningPortalImage}
            alt="lws_header_logo"
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/courseplayer"
            className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-full mr-5"
          >
            course access
          </Link>
          <Link
            to="/leaderboard"
            className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-full mr-5"
          >
            Leaderboard
          </Link>
          <h2 className="font-bold">{name}</h2>
          <button
            className="rounded bg-primary px-6 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-full px-4 py-1 flex gap-2"
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

export default StudentNav;
