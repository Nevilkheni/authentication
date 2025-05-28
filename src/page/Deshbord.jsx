import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  let loggedInUser = null;
  let users = [];
  let loginRecords = [];

  try {
    loggedInUser = JSON.parse(localStorage.getItem('loggedIn')) || null;
    users = JSON.parse(localStorage.getItem('users')) || [];
    loginRecords = JSON.parse(localStorage.getItem('loginRecords')) || [];
  } catch (err) {
    console.error('Error parsing localStorage:', err);
    setError('Failed to load data. Please try logging in again.');
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  const handleDelete = (email) => {
    try {
      const updatedUsers = users.filter((user) => user.email !== email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      if (loggedInUser && loggedInUser.email === email) {
        localStorage.removeItem('loggedIn');
        navigate('/login');
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <p className="text-red-500 text-center">{error}</p>
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Dashboard</h2>
      {loggedInUser ? (
        <>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-800">Welcome 👋</h3>
            <p className="text-gray-700 mt-1">You are logged in as <span className="font-medium">{loggedInUser.email}</span></p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Stored Users</h3>
            <ul className="space-y-2">
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded hover:bg-gray-200 transition"
                  >
                    <span>{user.email || 'Unknown'}</span>
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <li className="p-3 bg-gray-100 rounded">No users found</li>
              )}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Login History</h3>
            <ul className="space-y-2">
              {Array.isArray(loginRecords) && loginRecords.length > 0 ? (
                loginRecords.map((record, index) => (
                  <li key={index} className="p-3 bg-gray-100 rounded">
                    {record.email || 'Unknown'} logged in at{' '}
                    {record.timestamp ? new Date(record.timestamp).toLocaleString() : 'Invalid date'}
                  </li>
                ))
              ) : (
                <li className="p-3 bg-gray-100 rounded">No login records found</li>
              )}
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-center text-gray-600">
          No user logged in. Please{' '}
          <Link to="/login" className="text-blue-600 font-medium underline">
            login
          </Link>.
        </p>
      )}
    </div>
  );
};

export default Dashboard;