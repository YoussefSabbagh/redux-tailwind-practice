import AddUserForm from './addUserForm';
import UpdateUserForm from './updateUserForm';
import { useSelector } from 'react-redux';
import { useReducer } from 'react';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const Form = () => {
  const {
    client: { updateUserId, userForm },
  } = useSelector((state) => state.general);

  const [formData, setFormData] = useReducer(formReducer, {});

  const flag = userForm === 'Update';

  return (
    <div className="container mx-auto mb-10">
      {flag
        ? UpdateUserForm({ updateUserId, formData, setFormData })
        : AddUserForm({ formData, setFormData })}
    </div>
  );
};

export default Form;
