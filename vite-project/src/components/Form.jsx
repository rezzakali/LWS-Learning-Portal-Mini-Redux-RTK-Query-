import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import Error from '../ui/Error';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, { data, isSuccess, isError, error: resError, isLoading }] =
    useLoginMutation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    login({
      email,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
      setTimeout(() => {
        navigate('/courseplayer');
      }, 50);
    }
    if (isError) {
      setError(resError?.data);
    }
  }, [isSuccess, isError, data]);

  return (
    <form className="mt-3 space-y-6 p-3" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
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
            autoComplete="current-password"
            required
            className="login-input rounded-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Link
          to="/admin"
          className="font-medium text-violet-600 hover:text-violet-500 capitalize"
        >
          Login As Admin
        </Link>
        <Link
          to="/register"
          className="font-medium text-violet-600 hover:text-violet-500 capitalize"
        >
          Create New Account
        </Link>
      </div>

      <div>
        <button
          type="submit"
          className="rounded bg-primary px-8 py-2 text-sm font-medium capitalize leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] rounded-lg group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white mb-3"
          disabled={isLoading}
        >
          Sign in
        </button>
      </div>
      {error !== '' && <Error error={error} />}
    </form>
  );
}

export default Form;
