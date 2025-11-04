// src/section/Users.jsx
import React from 'react';
import UsersTable from '../components/users/UsersTable';

function Users() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-primary mb-4">Users Section</h1>
      <UsersTable />
    </div>
  );
}

export default Users;
