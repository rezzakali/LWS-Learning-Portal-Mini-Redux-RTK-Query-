import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';
import Error from '../../ui/Error';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [register, { isSuccess, error: resError, isLoading }] =
    useRegisterMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Password mismatch');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
      setTimeout(() => {
        navigate('/courseplayer');
      }, 50);
    }
    if (resError) {
      setError(resError?.data);
    }
  }, [isSuccess, resError]);

  return (
    <>
      <form className="mt-1 space-y-6 p-3" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              className="login-input rounded-full"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="login-input rounded-full"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password rounded-full"
              required
              className="login-input rounded-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="confirm-password"
              required
              className="login-input rounded-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link
              to="/"
              className="font-medium text-violet-600 hover:text-violet-500 capitalize"
            >
              Already have an account!
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="rounded bg-primary px-8 py-2 text-sm font-medium capitalize leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white mb-3"
            disabled={isLoading}
          >
            Create Account
          </button>
        </div>
        {error !== '' && <Error error={error} />}
      </form>
    </>
  );
}

export default RegisterForm;
