import { useState } from 'react';
import Head from 'next/head';
import { FaUserPlus } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addAction,
  deleteAction,
} from '../redux/features/general/generalSlice';

import Table from '../components/table';
import Form from '../components/form';
import DeleteComponent from '../components/deleteVerification';
import { deleteUsers, getUsers } from '../services/helpers';

const Home = () => {
  const {
    client: { toggleForm, deleteUser },
  } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  const queryclient = useQueryClient();

  const deletehandler = async () => {
    if (deleteUser.id) {
      await deleteUsers(deleteUser.id);
      await queryclient.prefetchQuery(['users'], getUsers);
      await dispatch(deleteAction({ id: null, name: null }));
    }
  };

  const cancelhandler = async () => {
    console.log('cancel');
    await dispatch(deleteAction({ id: null, name: null }));
  };

  return (
    <section>
      <Head>
        <title>Taguara Digital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-5">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-8xl text-center py-10 font-bold">
          User Management
        </h1>
        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button
              className="flex bg-primary-500 hover:bg-primary-700 text-txt-100 px-4 py-2 rounded-2xl items-center"
              onClick={() => dispatch(addAction())}
            >
              {!toggleForm ? 'Add' : 'Close'}
              <span className="text-white px-2">
                <FaUserPlus size={18} fill="#e8e5e3" />
              </span>
            </button>
          </div>
          {!toggleForm && deleteUser.id && (
            <DeleteComponent
              deletehandler={deletehandler}
              cancelhandler={cancelhandler}
              userName={deleteUser.name}
            />
          )}
        </div>

        {toggleForm && <Form />}

        <div className="container mx-auto">
          <Table />
        </div>
      </main>
    </section>
  );
};

export default Home;
