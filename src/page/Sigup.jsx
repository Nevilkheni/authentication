import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (location.state?.email) {
      setValue('email', location.state.email);
    }
  }, [location.state, setValue]);

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.email === data.email);
    if (userExists) {
      alert('User already exists. Please login.');
      navigate('/login', { state: { email: data.email } });
      return;
    }
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedIn', JSON.stringify(data));
    alert('Signup successful. Redirecting to dashboard...');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium underline transition duration-200">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;