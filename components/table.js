import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { FaUserEdit, FaRegTrashAlt } from 'react-icons/fa';
import { getUsers } from '../services/helpers';
import {
  updateAction,
  deleteAction,
} from '../redux/features/general/generalSlice';

const Table = () => {
  const { isLoading, isError, data, error } = useQuery(['users'], getUsers);
  const {
    client: { toggleForm, deleteUser },
  } = useSelector((state) => state.general);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
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
          {data.map((user) => {
            return <TableRow key={user._id} user={user} />;
          })}
        </tbody>
      </table>
    </>
  );
};

const TableRow = ({ user }) => {
  const toggleForm = useSelector((state) => state.general.client.toggleForm);
  const dispatch = useDispatch();

  const handleDelete = (userId, userName) => {
    if (!toggleForm) dispatch(deleteAction({ id: userId, name: userName }));
  };

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
            onClick={() => dispatch(updateAction(user._id))}
          >
            <FaUserEdit size={18} fill={'#22c55e'} />
          </button>
          <button
            className="cursor hover:scale-110"
            onClick={() => handleDelete(user._id, user.name)}
          >
            <FaRegTrashAlt size={18} fill={'#f4425e'} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Table;
