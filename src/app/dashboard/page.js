'use client';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../store/authSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 py-8">
      <div className="p-8 sm:p-10 md:p-12 bg-white/90 backdrop-blur rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl text-center border border-gray-200">
       
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-gray-800">Welcome, {user?.name || 'User'}!</h1>
        <p className="text-gray-600 mb-8 text-base sm:text-lg">You&apos;re now on the dashboard panel.</p>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-pink-500 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 w-full sm:w-auto"
        >
          Logout
        </button>
      </div>
    </div>
  );
}