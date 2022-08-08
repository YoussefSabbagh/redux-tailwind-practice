import { BiCheck } from 'react-icons/bi';

const Success = ({ message = 'Probando' }) => {
  return (
    <div className="success container mx-auto">
      <div className="flex justify-center mx-auto border border-success bg-success w-3/6 text-txt-100 text-md my-4 py-2 text-center bg-opacity-30">
        {message} <BiCheck size={25} fill={'rgb(34,197,94)'}></BiCheck>
      </div>
    </div>
  );
};

export default Success;
