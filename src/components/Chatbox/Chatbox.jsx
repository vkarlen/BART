import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, TextField, Card } from '@mui/material';

function Chatbox() {
  // const messages = useSelector((store) => store.messages);
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
      <div className="chat-head">
        <div>
          <h5>Bart</h5>
        </div>
      </div>

      <div className="chat-body">
        <ul className="chat-window">
          <li>
            <div className="chat-card">
              <p>Hello. My name is Bart. How can I help you?</p>
            </div>
          </li>
        </ul>

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
    </div>
  );
}

export default Chatbox;
