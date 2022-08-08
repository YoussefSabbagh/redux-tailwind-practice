import { FaTimes } from 'react-icons/fa';

const Bugs = ({ message = 'Probando' }) => {
  return (
    <div className="success container mx-auto">
      <div className="flex justify-center items-center mx-auto border border-danger bg-danger w-3/6 text-txt-100 text-md my-4 py-2 text-center bg-opacity-30">
        {message}
        <span className="ml-2">
          <FaTimes size={20} fill={'red'} />
        </span>
      </div>
    </div>
  );
};

export default Bugs;
