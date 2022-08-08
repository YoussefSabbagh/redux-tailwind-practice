import { useReducer, useState } from 'react';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { FaPlus } from 'react-icons/fa';

import Success from './success';
import Bugs from './bugs';
import { createUser, getUsers } from '../services/helpers';

const AddUserForm = ({ formData, setFormData }) => {
  const queryClient = useQueryClient();
  const addMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.prefetchQuery(['users'], getUsers);
    },
  });

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    setError(false);
    e.preventDefault();

    /**
     * se deben de validar los datos que se suminitran, cambiar por react-hook-form la captura de datos
     *
     */

    if (Object.keys(formData).length === 0) {
      setError(true);
    } else {
      let { firstname, lastname, email, salary, date, status } = formData;

      const model = {
        name: `${firstname} ${lastname}`,
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 10
        )}.jpg`,
        email,
        salary,
        date,
        status: status ?? 'Active',
      };

      addMutation.mutate(model);
    }
  };

  return (
    <>
      {error && <Bugs message="You shuld provide user information" />}
      {addMutation.isLoading && (
        <Success message="Loading ... creating new user" />
      )}
      {addMutation.isError && <Bugs message={addMutation.error.message} />}

      {addMutation.isSuccess && <Success message="Added Successfully" />}
      <form
        className="grid lg:grid-cols-2 w-4/6 gap-4 m-auto"
        onSubmit={handleSubmit}
      >
        <div className="input-type">
          <input
            type="text"
            onChange={setFormData}
            name="firstname"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="FirstName"
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="lastname"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="LastName"
            onChange={setFormData}
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="email"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Email"
            onChange={setFormData}
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            name="salary"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            placeholder="Salary"
            onChange={setFormData}
          />
        </div>
        <div className="input-type">
          <input
            type="date"
            name="date"
            className="border px-5 py-3 focus:outline-none rounded-md"
            onChange={setFormData}
          />
        </div>

        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              type="radio"
              value="Active"
              id="radioDefault1"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-success checked:border-success focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              onChange={setFormData}
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
              type="radio"
              value="Inactive"
              id="radioDefault2"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-success checked:border-success focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              onChange={setFormData}
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
          className={`${
            addMutation.isSuccess || addMutation.isLoading
              ? 'hidden'
              : 'flex justify-center items-center text-md w-2/6 bg-success text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-success hover:text-success'
          } `}
          disabled={addMutation.isSuccess || addMutation.isLoading}
        >
          Add
          <FaPlus size={18} fill="#fff" />
        </button>
      </form>
    </>
  );
};

export default AddUserForm;
