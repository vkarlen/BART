import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, TextField, Card } from '@mui/material';

function Chatbox() {
  const chatHistory = useSelector((store) => store.messageReducer);
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  useEffect(() => {}, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('MESSAGE', message);

    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        message: message,
      },
    });
  };

  return (
    <div className="chat-container">
      {chatHistory.map((msg, index) => {
        return (
          <div key={index}>
            <h5>{msg.from}</h5>
            <p>{msg.message}</p>
          </div>
        );
      })}

      {/* User message input */}
      <form
        onSubmit={(e) => {
          sendMessage(e);
        }}
        className="input-container"
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          fullWidth
        />

        <Button type="submit" variant="contained" fullWidth>
          Send
        </Button>
      </form>
    </div>
  );
}

export default Chatbox;
