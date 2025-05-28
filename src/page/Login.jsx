import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const matchedUser = users.find((user) => user.email === data.email);
    if (!matchedUser) {
      alert('Email not found. Please sign up to create an account.');
      navigate('/signup', { state: { email: data.email } }); 
      return;
    }
    if (matchedUser.password !== data.password) {
      alert('Invalid password.');
      return;
    }
    localStorage.setItem('loggedIn', JSON.stringify(matchedUser));
    const loginRecords = JSON.parse(localStorage.getItem('loginRecords')) || [];
    const timestamp = new Date().toISOString();
    loginRecords.push({
      email: data.email,
      timestamp,
    });
    localStorage.setItem('loginRecords', JSON.stringify(loginRecords));
    const record = { email: data.email, timestamp };
    const dataStr = JSON.stringify(record, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `login-record-${timestamp}.json`;
    link.click();
    URL.revokeObjectURL(url);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;