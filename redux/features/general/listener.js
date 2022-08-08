import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addAction, updateAction } from './generalSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addAction,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(updateAction(action.payload));
  },
});

export default listenerMiddleware;
