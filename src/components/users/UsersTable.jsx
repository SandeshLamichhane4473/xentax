import React, { useState } from 'react';

const dummyUsers = [
  {
    LOGINNAME: 'admin01',
    USERNAME: 'Administrator',
    USERTYPE: 'A',
    USERMAIL: 'admin@bank.com',
    BANK_CODE: '11002102',
    OLY_USERCODE: '0012000',
    USERPRIV: 'FULL',
    LAST_LOGIN_DATE: '2025/01/20',
    LAST_LOGIN_TIME: '09:15:30',
    LAST_PWD_CDATE: '2025/01/01',
    LAST_LOGIN_IP: '192.168.1.100',
    GRACECOUNT: 0,
    STATUS: 'Y',
  },
  {
    LOGINNAME: 'user01',
    USERNAME: 'John Doe',
    USERTYPE: 'U',
    USERMAIL: 'john.doe@mail.com',
    BANK_CODE: '11002104',
    OLY_USERCODE: '0012001',
    USERPRIV: 'LIMITED',
    LAST_LOGIN_DATE: '2025/01/18',
    LAST_LOGIN_TIME: '14:20:10',
    LAST_PWD_CDATE: '2025/01/10',
    LAST_LOGIN_IP: '192.168.1.120',
    GRACECOUNT: 1,
    STATUS: 'N',
  },
  // add more dummy data as needed
];

const UsersTable = () => {
  const [users, setUsers] = useState(dummyUsers);

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // number of rows per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users List</h2>
        <button className="bg-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm">+ New User</button>
      </div>

      {/* Table wrapper with horizontal scroll */}
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-max table-auto border border-gray-300 text-[12px] whitespace-nowrap">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-2">SN</th>
              <th className="p-2">Login Name</th>
              <th className="p-2 sticky left-0 bg-primary z-40">User Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">User Type</th>
              <th className="p-2">Bank Code</th>
              <th className="p-2">OLY Usercode</th>
              <th className="p-2">User Priv</th>
              <th className="p-2">Last Login Date</th>
              <th className="p-2">Last Login Time</th>
              <th className="p-2">Last Pwd Date</th>
              <th className="p-2">Last Login IP</th>
              <th className="p-2">Grace Count</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
              >
                <td className="p-2">{indexOfFirstItem + index + 1}</td>
                <td className="p-2">{user.LOGINNAME}</td>
                <td className="p-2 sticky left-0 bg-white z-30">{user.USERNAME}</td>
                <td className="p-2">{user.USERMAIL}</td>
                <td className="p-2">{user.USERTYPE}</td>
                <td className="p-2">{user.BANK_CODE}</td>
                <td className="p-2">{user.OLY_USERCODE}</td>
                <td className="p-2">{user.USERPRIV}</td>
                <td className="p-2">{user.LAST_LOGIN_DATE}</td>
                <td className="p-2">{user.LAST_LOGIN_TIME}</td>
                <td className="p-2">{user.LAST_PWD_CDATE}</td>
                <td className="p-2">{user.LAST_LOGIN_IP}</td>
                <td className="p-2">{user.GRACECOUNT}</td>
                <td className="p-2">{user.STATUS === 'Y' ? 'Active' : 'Inactive'}</td>
                <td className="p-2 space-x-2">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-yellow-500 hover:underline">Reset Password</button>
                  <button className="text-green-500 hover:underline">Unlock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-2 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;
