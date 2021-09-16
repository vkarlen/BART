import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendMessage(action) {
  try {
    yield put({
      type: 'ADD_MESSAGE',
      payload: { from: 'User', message: action.payload.message },
    });

    const response = yield axios.post('/api/bart/text-input', action.payload);

    for (const message of response.data.fulfillmentMessages) {
      yield put({
        type: 'ADD_MESSAGE',
        payload: {
          from: 'Bart',
          message: message.text.text[0],
        },
      });
    }
  } catch (err) {
    console.error('Error in handleConversation', err.message);
  }
}

function* bartSaga() {
  yield takeLatest('SEND_MESSAGE', sendMessage);
}

export default bartSaga;
