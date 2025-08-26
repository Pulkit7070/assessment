import React, { useState } from 'react';
import { useOrgUsers } from '../hooks/useOrgUsers';


const UserList: React.FC = () => {

  const { users, loading, error, refetch } = useOrgUsers();
  const [search, setSearch] = useState('');
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  // Add user handler
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    setAddSuccess('');
    if (!addName.trim() || !addEmail.trim()) {
      setAddError('Name and email are required.');
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/users.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: addName, email: addEmail })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setAddSuccess('User added successfully!');
        setAddName('');
        setAddEmail('');
        refetch();
      } else {
        setAddError(data.error || 'Failed to add user.');
      }
    } catch (err) {
      setAddError('Failed to add user.');
    }
  };

  // Filter users by search input (name or email)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <span className="text-lg text-green-700 font-medium">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Error Loading Users</h3>
        <p className="text-green-700 mb-4">{error}</p>
        <button
          onClick={refetch}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-green-700 mb-2">No .org Users Found</h3>
        <p className="text-green-600 mb-4">No users with .org email addresses are available.</p>
        <button
          onClick={refetch}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 mx-auto"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
        <div className="flex flex-col flex-1">
          <label htmlFor="addName" className="text-green-900 font-medium mb-1">Name</label>
          <input
            id="addName"
            type="text"
            value={addName}
            onChange={e => setAddName(e.target.value)}
            className="border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 bg-white"
            placeholder="Enter name"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="addEmail" className="text-green-900 font-medium mb-1">Email</label>
          <input
            id="addEmail"
            type="email"
            value={addEmail}
            onChange={e => setAddEmail(e.target.value)}
            className="border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 bg-white"
            placeholder="Enter email"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 min-w-[120px]"
        >
          Add User
        </button>
      </form>
      {(addError || addSuccess) && (
        <div className={`mb-4 text-center ${addError ? 'text-red-600' : 'text-green-700'}`}>{addError || addSuccess}</div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-green-900">Organization Users</h2>
          <p className="text-green-700 mt-1">
            Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} with .org email addresses
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 bg-white"
          />
          <button
            onClick={refetch}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-green-700 py-8">No users match your search.</div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    {user.name}
                  </h3>
                  <div className="text-green-700">
                    {user.email}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-green-600 mb-2">ID: {user.id}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;