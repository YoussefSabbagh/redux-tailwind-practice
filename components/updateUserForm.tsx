import { FaUserEdit } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Success from './success';
import Bugs from './bugs';
import { getUserById, getUsers, updateUser } from '../services/helpers';

const UpdateUserForm = ({ updateUserId, formData, setFormData }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ['users', updateUserId],
    () => getUserById(updateUserId)
  );

  const UpdateMutation = useMutation(
    (newData) => updateUser(updateUserId, newData),
    {
      onSuccess: async (data) => {
        queryClient.prefetchQuery(['users'], getUsers);
      },
    }
  );

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <div>Error</div>;

  const { name, avatar, salary, date, email, status } = data;
  const [firstname, lastname] = name ? name.split(' ') : formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userName = `${formData.firstname ?? firstname} ${
      formData.lastname ?? lastname
    }`;

    let updated = Object.assign({}, data, formData, { name: userName });

    await UpdateMutation.mutate(updated);
  };
  return (
    <>
      {error && <Bugs message="You shuld provide user information" />}
      {isLoading && <Success message="Loading ... user" />}

      <form
        className="grid lg:grid-cols-2 w-4/6 gap-4 m-auto"
        onSubmit={handleSubmit}
      >
        <div className="input-type">
          <input
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            onChange={setFormData}
            type="text"
            name="firstname"
            defaultValue={firstname}
            placeholder="FirstName"
          />
        </div>
        <div className="input-type">
          <input
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            onChange={setFormData}
            type="text"
            name="lastname"
            defaultValue={lastname}
            placeholder="LastName"
          />
        </div>
        <div className="input-type">
          <input
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            onChange={setFormData}
            type="text"
            name="email"
            defaultValue={email}
            placeholder="Email"
          />
        </div>
        <div className="input-type">
          <input
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            onChange={setFormData}
            type="text"
            name="salary"
            defaultValue={salary}
            placeholder="Salary"
          />
        </div>
        <div className="input-type">
          <input
            className="border px-5 py-3 focus:outline-none rounded-md"
            onChange={setFormData}
            type="date"
            name="date"
            defaultValue={date}
          />
        </div>

        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-success checked:border-success focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              onChange={setFormData}
              type="radio"
              name="status"
              value="Active"
              defaultChecked={status === 'Active'}
              id="radioDefault1"
            />
            <label
              htmlFor="radioDefault1"
              className="inline-block text-gray-800"
            >
              Active
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-success checked:border-success focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              onChange={setFormData}
              type="radio"
              name="status"
              defaultChecked={status !== 'Active'}
              value="Inactive"
              id="radioDefault2"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block text-gray-800"
            >
              Inactive
            </label>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className={
            'flex justify-center items-center text-md w-2/6 bg-warning text-main-900 px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-warning hover:text-success'
          }
        >
          {'Update - '} <FaUserEdit size={18} fill="#000" />
        </button>
      </form>
    </>
  );
};

export default UpdateUserForm;
