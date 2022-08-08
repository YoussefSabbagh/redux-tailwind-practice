import { useState } from 'react';
import Head from 'next/head';
import { FaUserPlus } from 'react-icons/fa';

import Table from '../components/tabletest';
import Form from '../components/form';

const TestScreen = () => {
  const [visible, setVisible] = useState(false);

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
              onClick={() => {
                setVisible(!visible);
              }}
            >
              {!visible ? 'Add' : 'Close'}
              <span className="text-white px-2">
                <FaUserPlus size={18} fill="#e8e5e3" />
              </span>
            </button>
          </div>
        </div>

        {visible && <Form />}

        <div className="container mx-auto">
          <Table setVisible={setVisible} />
        </div>
      </main>
    </section>
  );
};

export default TestScreen;
