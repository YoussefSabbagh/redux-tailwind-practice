import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUserById } from '../redux/features/user/userSlice';

import { FaUserEdit, FaRegTrashAlt } from 'react-icons/fa';
import { getUsers } from '../services/helpers';

// import data from '../database/data.json';

const TableTest = ({ setVisible }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      {user.loading && <div>Loading ...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user.users.length ? (
        <table className="min-w-full table-auto">
          <thead className="bg-primary-300">
            <tr>
              <th className="px-16 py-2">
                <span className="text-primary-900">Name</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-primary-900">Email</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-primary-900">Salary</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-primary-900">Birthday</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-primary-900">Status</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-primary-900">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-100">
            {user.users.map((user) => {
              return (
                <TableRow key={user._id} user={user} setVisible={setVisible} />
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

const TableRow = ({ user, setVisible }) => {
  const dispatch = useDispatch();
  return (
    <tr>
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          src={user.avatar || '#'}
          alt={user.name}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-center ml-2 font-semibold">{user.name}</span>
      </td>
      <td className="px-16 py-2">
        <span>{user.email || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <span>{user.salary || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <span>{user.date || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor">
          <span
            className={`${
              user.status == 'Active' ? 'bg-success' : 'bg-danger'
            } text-white px-5 py-1 rounded-full`}
          >
            <span>{user.status || 'Unknown'}</span>
          </span>
        </button>
      </td>
      <td className="px-16 py-2">
        <div className="flex justify-around items-center gap-5">
          <button
            className="cursor hover:scale-110"
            onClick={() => dispatch(fetchUserById(user._id))}
          >
            <FaUserEdit size={18} fill={'#22c55e'} />
          </button>
          <button
            className="cursor hover:scale-105"
            onClick={() => setVisible(true)}
          >
            <FaRegTrashAlt size={18} fill={'#f4425e'} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableTest;
