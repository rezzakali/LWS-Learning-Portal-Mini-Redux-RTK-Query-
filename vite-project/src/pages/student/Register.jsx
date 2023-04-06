import React from 'react';
import RegisterForm from '../../components/_student/RegisterForm';
import LWSLogo from '../../ui/LWSLogo';
import setPageTitle from '../../utils/setPageTitle';

function Register() {
  setPageTitle('register');

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto w-auto p-8 lg:px-0 border border-slate-600/50 rounded bg-primary px-8 py-2 text-sm font-medium capitalize leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
        <div className="p-6">
          <LWSLogo />
          <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <RegisterForm />
      </div>
    </section>
  );
}

export default Register;
